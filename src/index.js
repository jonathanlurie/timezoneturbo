import pointInPolygon from 'robust-point-in-polygon'
import * as topojson from 'topojson-client'
import bvh from '../data/bvh.json'
import topoData from '../data/countries-10m.json'

console.log('bvh ', bvh)
const countriesPolygons = {}


function decodePolygons() {
  const countries = topojson.feature(topoData, topoData.objects.countries)

  console.log(countries);

  for (let i = 0; i < countries.features.length; i += 1) {
    let polygonCounter = 0 // some polygons have a 0 area so we cannot rely solely in i
    const feature = countries.features[i]
    const geometry = feature.geometry
    const id = feature.properties.name
    const geometryType = geometry.type

    if (geometryType !== 'Polygon' && geometryType !== 'MultiPolygon') {
      continue
    }

    // treating all polygons as if they were multipolygons
    // because it makes the next part easier
    const polygons = geometryType === 'Polygon' ? [geometry.coordinates[0]] : geometry.coordinates.map(el => el[0])

    countriesPolygons[id] = polygons
    // for (let p = 0; p < polygons.length; p += 1) {
    //   const polygon = polygons[p]
    // }

    // some Russian polygons are traversing to the other side of the globe creating artifact.
    // This seems to be due to the conversion from topjson to geojson
    // if meridian side is 1, then -180 should be replaced by 180
    // if meridian side is -1, then 180 should be replaced by -180
    if (id === 'Russia') {
      polygons.forEach((polygon) => {
        const meridianSide = Math.sign(polygon.reduce((acc, lonLat) => acc + lonLat[0] / polygon.length, 0))
        for (let j = 0; j < polygon.length; j += 1) {
          const lon = polygon[j][0]
          if (lon === -180 && meridianSide === 1) {
            polygon[j][0] = 180
          } else if (lon === 180 && meridianSide === -1) {
            polygon[j][0] = -180
          }
        }
      })
    }
  }
}

console.time('decode countries')
decodePolygons()
console.timeEnd('decode countries')


function hitBvh(point) {
  const hitBoxes = []

  function isInsideBox(box) {
    return point[0] >= box[0][0] && point[0] <= box[1][0]
    && point[1] >= box[0][1] && point[1] <= box[1][1]
  }

  function h(node) {
    if (node.l && isInsideBox(node.l.b)) {
      node.l.parent = node
      hitBoxes.push(node.l)
      h(node.l)
    }

    if (node.r && isInsideBox(node.r.b)) {
      node.r.parent = node
      hitBoxes.push(node.r)
      h(node.r)
    }
  }

  if (isInsideBox(bvh.b)) {
    h(bvh)
  }

  const leaves = hitBoxes.filter((b) => !b.l)
  const candidatePolygons = []

  for (let b = 0; b < leaves.length; b += 1) {
    const polygonList = leaves[b].p
    for (let p = 0; p < polygonList.length; p += 1) {
      const pol = polygonList[p]
      pol.parentNode = leaves[b]
      const polAABB = pol.b

      if (point[0] >= polAABB[0][0] && point[0] <= polAABB[1][0]
        && point[1] >= polAABB[0][1] && point[1] <= polAABB[1][1]) {
        candidatePolygons.push(pol)
      }
    }
  }

  return candidatePolygons
}

function getCountryPolygon(point) {
  const candidatePolygons = hitBvh(point)

  for (let i = 0; i < candidatePolygons.length; i += 1) {
    const p = candidatePolygons[i]
    const polygon = countriesPolygons[p.id][p.i]
    if (pointInPolygon(polygon, point) < 1) {
      return p
    }
  }

  return null
}


export function getCountry(point) {
  const matchPolygon = getCountryPolygon(point)
  return matchPolygon ? matchPolygon.id : null
}
