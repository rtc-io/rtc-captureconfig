# rtc-streamclass

This is a simple parser that takes a string of text and determines what
that means in the context of WebRTC.


[![NPM](https://nodei.co/npm/rtc-captureclass.png)](https://nodei.co/npm/rtc-captureclass/)

[![Build Status](https://travis-ci.org/rtc-io/rtc-captureclass.png?branch=master)](https://travis-ci.org/rtc-io/rtc-captureclass)
[![unstable](http://hughsk.github.io/stability-badges/dist/unstable.svg)](http://github.com/hughsk/stability-badges)

## Reference

## CaptureConfig

This is a utility class that is used to update capture configuration
details and is able to generate suitable getUserMedia constraints based
on the configuration.

### camera(index)

Update the camera configuration to the specified index

### microphone(index)

Update the microphone configuration to the specified index

### max(data)

Update a maximum constraint.  If an fps constraint this will be directed
to the `maxfps` modifier.

### maxfps(data)

Update the maximum fps

### min(data)

Update a minimum constraint.  This can be either related to resolution
or FPS.

### minfps(data)

Update the minimum fps

### _parseRes(data) __internal__

Parse a resolution specifier (e.g. 1280x720) into a simple JS object
(e.g. { w: 1280, h: 720 })

## License(s)

### Apache 2.0

Copyright 2013 National ICT Australia Limited (NICTA)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
