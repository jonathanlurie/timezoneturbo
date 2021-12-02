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
        1.7999,
        46.44
    ],
    "timezone": "Europe/Paris",
    "unixTimestamp": 1638438658.725,
    "localTime": "02/12/2021, 10:50:58 CET",
    "sun": {
        "previousDay": {
            "solarNoon": "01/12/2021, 12:43:21 CET",
            "nadir": "01/12/2021, 00:43:21 CET",
            "sunrise": "01/12/2021, 08:17:14 CET",
            "sunset": "01/12/2021, 17:09:27 CET",
            "sunriseEnd": "01/12/2021, 08:20:53 CET",
            "sunsetStart": "01/12/2021, 17:05:49 CET",
            "dawn": "01/12/2021, 07:43:04 CET",
            "dusk": "01/12/2021, 17:43:37 CET",
            "nauticalDawn": "01/12/2021, 07:05:24 CET",
            "nauticalDusk": "01/12/2021, 18:21:18 CET",
            "nightEnd": "01/12/2021, 06:29:08 CET",
            "night": "01/12/2021, 18:57:34 CET",
            "goldenHourEnd": "01/12/2021, 09:06:24 CET",
            "goldenHour": "01/12/2021, 16:20:18 CET"
        },
        "currentDay": {
            "solarNoon": "02/12/2021, 12:43:43 CET",
            "nadir": "02/12/2021, 00:43:43 CET",
            "sunrise": "02/12/2021, 08:18:25 CET",
            "sunset": "02/12/2021, 17:09:02 CET",
            "sunriseEnd": "02/12/2021, 08:22:04 CET",
            "sunsetStart": "02/12/2021, 17:05:23 CET",
            "dawn": "02/12/2021, 07:44:10 CET",
            "dusk": "02/12/2021, 17:43:17 CET",
            "nauticalDawn": "02/12/2021, 07:06:26 CET",
            "nauticalDusk": "02/12/2021, 18:21:01 CET",
            "nightEnd": "02/12/2021, 06:30:08 CET",
            "night": "02/12/2021, 18:57:19 CET",
            "goldenHourEnd": "02/12/2021, 09:07:44 CET",
            "goldenHour": "02/12/2021, 16:19:43 CET"
        },
        "nextDay": {
            "solarNoon": "2021-12-03T11:44:07.188Z",
            "nadir": "2021-12-02T23:44:07.188Z",
            "sunrise": "2021-12-03T07:19:34.635Z",
            "sunset": "2021-12-03T16:08:39.742Z",
            "sunriseEnd": "2021-12-03T07:23:14.515Z",
            "sunsetStart": "2021-12-03T16:04:59.861Z",
            "dawn": "2021-12-03T06:45:15.477Z",
            "dusk": "2021-12-03T16:42:58.899Z",
            "nauticalDawn": "2021-12-03T06:07:27.730Z",
            "nauticalDusk": "2021-12-03T17:20:46.647Z",
            "nightEnd": "2021-12-03T05:31:07.142Z",
            "night": "2021-12-03T17:57:07.234Z",
            "goldenHourEnd": "2021-12-03T08:09:03.230Z",
            "goldenHour": "2021-12-03T15:19:11.146Z"
        }
    },
    "moon": {
        "previousDay": {
            "rise": "01/12/2021, 04:26:42 CET",
            "set": "01/12/2021, 15:34:01 CET",
            "fraction": 0.11216735733893929,
            "phase": 0.8912927461847269,
            "angle": 1.977246527181093,
            "azimuth": 0.22200012656706536,
            "altitude": 0.5837848857390256,
            "distance": 369209.1159353532,
            "parallacticAngle": 0.15437045376015637
        },
        "currentDay": {
            "rise": "02/12/2021, 05:46:13 CET",
            "set": "02/12/2021, 16:00:50 CET",
            "fraction": 0.04958154730639297,
            "phase": 0.9285230380532703,
            "angle": 1.9135781510124055,
            "azimuth": -0.03482619388514546,
            "altitude": 0.4985819896170114,
            "distance": 366521.38110429654,
            "parallacticAngle": -0.024843629645853
        },
        "nextDay": {
            "rise": "03/12/2021, 07:07:00 CET",
            "set": "03/12/2021, 16:32:04 CET",
            "fraction": 0.011251859108405593,
            "phase": 0.9661717066630712,
            "angle": 1.7945428235210732,
            "azimuth": -0.2699533100117872,
            "altitude": 0.3893975411718424,
            "distance": 364790.3632504633,
            "parallacticAngle": -0.19668434807430024
        }
    }
}
```