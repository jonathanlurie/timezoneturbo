import pointInPolygon from 'robust-point-in-polygon'
import SunCalc from 'suncalc'
import bvh from '../data/bvh.json'
import base64Polygons from '../data/base64Polygons.json'

let tzData = null

function groupByPairs(polygonStreamline) {
  const polygon = []
  for (let k = 0; k < polygonStreamline.length; k += 2) {
    polygon.push([
      polygonStreamline[k],
      polygonStreamline[k + 1],
    ])
  }
  return polygon
}


function decodePolygons() {
  if (tzData) {
    return
  }

  tzData = {}
  const tzIds = Object.keys(base64Polygons)

  for (let i = 0; i < tzIds.length; i += 1) {
    const tzId = tzIds[i]
    const polygonsB64 = base64Polygons[tzId]
    tzData[tzId] = []

    for (let j = 0; j < polygonsB64.length; j += 1) {
      const polygonStreamline = new Float32Array((new Uint8Array(Array.from(atob(polygonsB64[j])).map((char) => char.charCodeAt(0)))).buffer)
      const polygon = groupByPairs(polygonStreamline)
      tzData[tzId].push(polygon)
    }
  }
}


try {
  decodePolygons()
} catch(e) {
  // nothing
}


export function getAllPolygons() {
  return tzData
}


function hitBvh(point) {
  const hitBoxes = []

  function isInsideBox(box) {
    return point[0] >= box[0][0] && point[0] <= box[1][0]
    && point[1] >= box[0][1] && point[1] <= box[1][1]
  }

  function h(b) {
    if (b.l && isInsideBox(b.l.b)) {
      hitBoxes.push(b.l)
      h(b.l)
    }

    if (b.r && isInsideBox(b.r.b)) {
      hitBoxes.push(b.r)
      h(b.r)
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
      const polAABB = pol.b

      if (point[0] >= polAABB[0][0] && point[0] <= polAABB[1][0]
        && point[1] >= polAABB[0][1] && point[1] <= polAABB[1][1]) {
        candidatePolygons.push(pol)
      }
    }
  }

  return candidatePolygons
}


function getTimezoneId(point) {
  const candidatePolygons = hitBvh(point)

  // load the necessar  y polygons
  for (let i = 0; i < candidatePolygons.length; i += 1) {
    const p = candidatePolygons[i]
    p.polygon = tzData[p.tz][p.i]
  }

  // if some could not be loaded, delete those
  const matches = candidatePolygons
    .filter((p) => p.polygon)
    .filter((p) => pointInPolygon(p.polygon, point) < 1)

  if (matches.length) {
    return matches[0].tz
  }

  return null
}


function getFormattedDate(formatter, date) {
  if (!isFinite(date)) {
    return null
  }

  return formatter.format(date)
}


export function getLocalTimeInfo(point, date = new Date()) {
  decodePolygons()

  const datePlusOneDay = new Date()
  datePlusOneDay.setUTCDate(date.getUTCDate() + 1)
  const dateMinusOneDay = new Date()
  dateMinusOneDay.setUTCDate(date.getUTCDate() - 1)

  const tz = getTimezoneId(point)
  const datetimeFormatter = new Intl.DateTimeFormat('en-ca', {timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZoneName: 'short'})
  const datetime = datetimeFormatter.format(date)
  const sunTimes = SunCalc.getTimes(date, point[1], point[0])

  Object.keys(sunTimes).forEach((k) => {
    if (sunTimes[k] instanceof Date) {
      sunTimes[k] = getFormattedDate(datetimeFormatter, sunTimes[k])
    }
  })

  const sunTimesMinus = SunCalc.getTimes(dateMinusOneDay, point[1], point[0])

  Object.keys(sunTimesMinus).forEach((k) => {
    if (sunTimesMinus[k] instanceof Date) {
      sunTimesMinus[k] = getFormattedDate(datetimeFormatter, sunTimesMinus[k])
    }
  })

  const sunTimesPlus = SunCalc.getTimes(datePlusOneDay, point[1], point[0])

  Object.keys(datePlusOneDay).forEach((k) => {
    if (datePlusOneDay[k] instanceof Date) {
      datePlusOneDay[k] = getFormattedDate(datetimeFormatter, datePlusOneDay[k])
    }
  })

  const moonTimes = SunCalc.getMoonTimes(date, point[1], point[0])

  Object.keys(moonTimes).forEach((k) => {
    if (moonTimes[k] instanceof Date) {
      moonTimes[k] = getFormattedDate(datetimeFormatter, moonTimes[k])
    }
  })

  const moonTimesMinus = SunCalc.getMoonTimes(dateMinusOneDay, point[1], point[0])

  Object.keys(moonTimesMinus).forEach((k) => {
    if (moonTimesMinus[k] instanceof Date) {
      moonTimesMinus[k] = getFormattedDate(datetimeFormatter, moonTimesMinus[k])
    }
  })

  const moonTimesPlus = SunCalc.getMoonTimes(datePlusOneDay, point[1], point[0])

  Object.keys(moonTimesPlus).forEach((k) => {
    if (moonTimesPlus[k] instanceof Date) {
      moonTimesPlus[k] = getFormattedDate(datetimeFormatter, moonTimesPlus[k])
    }
  })


  return {
    lonLat: point,
    timezone: tz,
    unixTimestamp: date.getTime() / 1000,
    localTime: datetime,
    sun: {
      previousDay: sunTimesMinus,
      currentDay: sunTimes,
      nextDay: sunTimesPlus,
    },
    moon: {
      previousDay: {
        ...moonTimesMinus,
        ...SunCalc.getMoonIllumination(dateMinusOneDay),
        ...SunCalc.getMoonPosition(dateMinusOneDay, point[1], point[0]),
      },
      currentDay: {
        ...moonTimes,
        ...SunCalc.getMoonIllumination(date),
        ...SunCalc.getMoonPosition(date, point[1], point[0]),
      },
      nextDay: {
        ...moonTimesPlus,
        ...SunCalc.getMoonIllumination(datePlusOneDay),
        ...SunCalc.getMoonPosition(datePlusOneDay, point[1], point[0]),
      },
    },
  }
}
