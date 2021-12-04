![](images/logo_1000.png)

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
```js
import { getLocalTimeInfo } from 'timezoneturbo'

// WGS84 coordinates
const coordinates = [
  1.7999,  // longitude
  46.4400, // latitude
]

const info = getLocalTimeInfo(coordinates)
```

```json
{
  "lonLat": [
    1.9749216300940367,
    46.83385579937305
  ],
  "timezone": "Europe/Paris",
  "unixTimestamp": 1638656858.239,
  "localTime": "2021-12-04, 23:27:38 GMT+1",
  "sun": {
    "previousDay": {
      "solarNoon": "2021-12-03, 12:43:25 GMT+1",
      "nadir": "2021-12-03, 24:43:25 GMT+1",
      "sunrise": "2021-12-03, 08:20:19 GMT+1",
      "sunset": "2021-12-03, 17:06:31 GMT+1",
      "sunriseEnd": "2021-12-03, 08:24:01 GMT+1",
      "sunsetStart": "2021-12-03, 17:02:48 GMT+1",
      "dawn": "2021-12-03, 07:45:40 GMT+1",
      "dusk": "2021-12-03, 17:41:09 GMT+1",
      "nauticalDawn": "2021-12-03, 07:07:34 GMT+1",
      "nauticalDusk": "2021-12-03, 18:19:15 GMT+1",
      "nightEnd": "2021-12-03, 06:30:58 GMT+1",
      "night": "2021-12-03, 18:55:52 GMT+1",
      "goldenHourEnd": "2021-12-03, 09:10:22 GMT+1",
      "goldenHour": "2021-12-03, 16:16:27 GMT+1"
    },
    "currentDay": {
      "solarNoon": "2021-12-04, 12:43:48 GMT+1",
      "nadir": "2021-12-04, 24:43:48 GMT+1",
      "sunrise": "2021-12-04, 08:21:27 GMT+1",
      "sunset": "2021-12-04, 17:06:10 GMT+1",
      "sunriseEnd": "2021-12-04, 08:25:10 GMT+1",
      "sunsetStart": "2021-12-04, 17:02:27 GMT+1",
      "dawn": "2021-12-04, 07:46:44 GMT+1",
      "dusk": "2021-12-04, 17:40:53 GMT+1",
      "nauticalDawn": "2021-12-04, 07:08:35 GMT+1",
      "nauticalDusk": "2021-12-04, 18:19:02 GMT+1",
      "nightEnd": "2021-12-04, 06:31:56 GMT+1",
      "night": "2021-12-04, 18:55:41 GMT+1",
      "goldenHourEnd": "2021-12-04, 09:11:40 GMT+1",
      "goldenHour": "2021-12-04, 16:15:57 GMT+1"
    },
    "nextDay": {
      "solarNoon": "2021-12-05T11:44:13.152Z",
      "nadir": "2021-12-04T23:44:13.152Z",
      "sunrise": "2021-12-05T07:22:34.170Z",
      "sunset": "2021-12-05T16:05:52.135Z",
      "sunriseEnd": "2021-12-05T07:26:17.383Z",
      "sunsetStart": "2021-12-05T16:02:08.922Z",
      "dawn": "2021-12-05T06:47:47.205Z",
      "dusk": "2021-12-05T16:40:39.100Z",
      "nauticalDawn": "2021-12-05T06:09:34.231Z",
      "nauticalDusk": "2021-12-05T17:18:52.074Z",
      "nightEnd": "2021-12-05T05:32:53.013Z",
      "night": "2021-12-05T17:55:33.291Z",
      "goldenHourEnd": "2021-12-05T08:12:56.143Z",
      "goldenHour": "2021-12-05T15:15:30.162Z"
    }
  },
  "moon": {
    "previousDay": {
      "rise": "2021-12-03, 07:07:35 GMT+1",
      "set": "2021-12-03, 16:29:53 GMT+1",
      "fraction": 0.0019522392205789663,
      "phase": 0.9859311676928413,
      "angle": 1.6281841607989562,
      "azimuth": 2.6547700913438668,
      "altitude": -1.0898101793160715,
      "distance": 364296.5896543847,
      "parallacticAngle": 0.35237017097760914
    },
    "currentDay": {
      "rise": "2021-12-04, 08:30:02 GMT+1",
      "set": "2021-12-04, 17:10:47 GMT+1",
      "fraction": 0.00583892670044589,
      "phase": 0.024346704368957084,
      "angle": -1.3064250029928914,
      "azimuth": 2.180223505933985,
      "altitude": -1.0171546887409797,
      "distance": 364179.4584375724,
      "parallacticAngle": 0.66657470025699
    },
    "nextDay": {
      "rise": "2021-12-05, 09:46:36 GMT+1",
      "set": "2021-12-05, 18:03:38 GMT+1",
      "fraction": 0.037576836772087396,
      "phase": 0.06209668407098512,
      "angle": -1.496494333500525,
      "azimuth": 1.8522032508804454,
      "altitude": -0.8695517549819841,
      "distance": 365140.2889697042,
      "parallacticAngle": 0.8209763623385692
    }
  }
}
```