console.time('t')
const timezoneturbo = require('..')

const coordinates = [
  1.7224880382775285, // longitude
  47.51196172248804, // latitude
]
const tzData = timezoneturbo.getLocalTimeInfo(coordinates)
console.timeEnd('t')
console.log(tzData)
