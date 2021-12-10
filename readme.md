![](images/logo_1000.png)

**TimezoneTurbo can be used both in browser and on Node.**  

# What's TimezoneTurbo?
It's a fast geographical lookup of timezones for clientside purpose. The package is about 4MB, which may seem fairly large but it includes high precision encoded polygons of every single timezone on Earth!

TimezoneTurbo lookup is fast (usually less than 3ms per lookup) and gives you extra information about the local coordinates:
- Time zone ID
- nicely formated local datetime
- local datetime for sunset/sunrise and more for the default day (default: current day), the day before and the day after
- moon informations for the default day (default: current day), the day before and the day after

# Install
```
npm install timezoneturbo
```


# Usage
As ES6 module:  
```js
import { getLocalTimeInfo } from 'timezoneturbo'

// WGS84 coordinates
const coordinates = [
  1.7224880382775285,  // longitude
  47.51196172248804, // latitude
]

const tzData = getLocalTimeInfo(coordinates)
```

In Node/CJS:  
```js
const getLocalTimeInfo = require('timezoneturbo').getLocalTimeInfo

// WGS84 coordinates
const coordinates = [
  1.7224880382775285, // longitude
  47.51196172248804, // latitude
]

const tzData = getLocalTimeInfo(coordinates)
```

In regular HTML:
```html
<script src="./dist/timezoneturbo.umd.js"></script>
<!-- Alternatively, use the minified version: -->
<!-- <script src="./dist/timezoneturbo.umd.min.js"></script> -->

<script>
  // WGS84 coordinates
  const coordinates = [
    1.7224880382775285, // longitude
    47.51196172248804, // latitude
  ]

  const tzData = timezoneturbo.getLocalTimeInfo(lonLat)
</script>
```

The resulting `tzData` object contains:  
```json
{
  "lonLat": [
    1.7224880382775285,
    47.51196172248804
  ],
  "timezone": "Europe/Paris",
  "unixTimestamp": 1639075761.711,
  "localTime": "2021-12-09, 19:49:21 GMT+1",
  "sun": {
    "previousDay": {
      "solarNoon": "2021-12-08, 12:46:29 GMT+1",
      "nadir": "2021-12-08, 24:46:29 GMT+1",
      "sunrise": "2021-12-08, 08:29:22 GMT+1",
      "sunset": "2021-12-08, 17:03:36 GMT+1",
      "sunriseEnd": "2021-12-08, 08:33:11 GMT+1",
      "sunsetStart": "2021-12-08, 16:59:47 GMT+1",
      "dawn": "2021-12-08, 07:53:48 GMT+1",
      "dusk": "2021-12-08, 17:39:09 GMT+1",
      "nauticalDawn": "2021-12-08, 07:14:53 GMT+1",
      "nauticalDusk": "2021-12-08, 18:18:05 GMT+1",
      "nightEnd": "2021-12-08, 06:37:37 GMT+1",
      "night": "2021-12-08, 18:55:21 GMT+1",
      "goldenHourEnd": "2021-12-08, 09:21:15 GMT+1",
      "goldenHour": "2021-12-08, 16:11:43 GMT+1"
    },
    "currentDay": {
      "solarNoon": "2021-12-09, 12:46:55 GMT+1",
      "nadir": "2021-12-09, 24:46:55 GMT+1",
      "sunrise": "2021-12-09, 08:30:22 GMT+1",
      "sunset": "2021-12-09, 17:03:27 GMT+1",
      "sunriseEnd": "2021-12-09, 08:34:12 GMT+1",
      "sunsetStart": "2021-12-09, 16:59:38 GMT+1",
      "dawn": "2021-12-09, 07:54:45 GMT+1",
      "dusk": "2021-12-09, 17:39:05 GMT+1",
      "nauticalDawn": "2021-12-09, 07:15:47 GMT+1",
      "nauticalDusk": "2021-12-09, 18:18:03 GMT+1",
      "nightEnd": "2021-12-09, 06:38:29 GMT+1",
      "night": "2021-12-09, 18:55:21 GMT+1",
      "goldenHourEnd": "2021-12-09, 09:22:23 GMT+1",
      "goldenHour": "2021-12-09, 16:11:27 GMT+1"
    },
    "nextDay": {
      "solarNoon": "2021-12-10, 12:47:21 GMT+1",
      "nadir": "2021-12-10, 24:47:21 GMT+1",
      "sunrise": "2021-12-10, 08:31:20 GMT+1",
      "sunset": "2021-12-10, 17:03:22 GMT+1",
      "sunriseEnd": "2021-12-10, 08:35:10 GMT+1",
      "sunsetStart": "2021-12-10, 16:59:32 GMT+1",
      "dawn": "2021-12-10, 07:55:40 GMT+1",
      "dusk": "2021-12-10, 17:39:03 GMT+1",
      "nauticalDawn": "2021-12-10, 07:16:39 GMT+1",
      "nauticalDusk": "2021-12-10, 18:18:04 GMT+1",
      "nightEnd": "2021-12-10, 06:39:19 GMT+1",
      "night": "2021-12-10, 18:55:23 GMT+1",
      "goldenHourEnd": "2021-12-10, 09:23:28 GMT+1",
      "goldenHour": "2021-12-10, 16:11:14 GMT+1"
    }
  },
  "moon": {
    "previousDay": {
      "rise": "2021-12-08, 12:30:59 GMT+1",
      "set": "2021-12-08, 21:37:00 GMT+1",
      "fraction": 0.2517495327388652,
      "phase": 0.16730896543401935,
      "angle": -1.8353881755245698,
      "azimuth": 0.6783003495669113,
      "altitude": 0.22393656702193765,
      "distance": 373130.5328367068,
      "parallacticAngle": 0.46950725946878014
    },
    "currentDay": {
      "rise": "2021-12-09, 13:01:12 GMT+1",
      "set": "2021-12-09, 22:55:28 GMT+1",
      "fraction": 0.35407677640126894,
      "phase": 0.2028651874841162,
      "angle": -1.9114983968104389,
      "azimuth": 0.506381576092079,
      "altitude": 0.37809643715161545,
      "distance": 377327.755516292,
      "parallacticAngle": 0.3479581118661091
    },
    "nextDay": {
      "rise": "2021-12-10, 13:26:50 GMT+1",
      "fraction": 0.46092734100141763,
      "phase": 0.23755009307942787,
      "angle": -1.9635664433969007,
      "azimuth": 0.3191001393128391,
      "altitude": 0.5194955954662528,
      "distance": 381922.23331837234,
      "parallacticAngle": 0.2175852436766208
    }
  }
}
```
The lunar and solar informations are computed by [@mourner](https://twitter.com/mourner)'s [Suncalc](https://github.com/mourner/suncalc). I thought it was a nice addition.

By default, TimezoneTurbo uses the current date, but a **custom date** can also be provided:   
```js
// A date with a timezone info
const d = new Date('1985-01-27, 12:18:28 GMT+1')

// Location near NYC, not in GMT+1
const coordinates = [-75.50239234449762, 37.75119617224882]
const tzData = getLocalTimeInfo(coordinates, {date: d})
```


# Data generation
If you are curious about how the data fueling TimezoneTurbo were generated, have a look at [this repo](https://github.com/jonathanlurie/geodatapreparation).