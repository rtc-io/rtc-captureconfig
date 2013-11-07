# rtc-captureconfig

This is a simple parser that takes a string of text and determines what
that means in the context of WebRTC.


[![NPM](https://nodei.co/npm/rtc-captureconfig.png)](https://nodei.co/npm/rtc-captureconfig/)

[![Build Status](https://travis-ci.org/rtc-io/rtc-captureconfig.png?branch=master)](https://travis-ci.org/rtc-io/rtc-captureconfig)
[![unstable](http://hughsk.github.io/stability-badges/dist/unstable.svg)](http://github.com/hughsk/stability-badges)

## Why?

It provides a simple, textual way of describing your requirements for
media capture.  Trying to remember the structure of the constraints object
is painful.

## How

A simple text string is converted to an intermediate JS object
representation, which can then be converted to a getUserMedia constraints
data structure using a `toConstraints()` call.

For example, the following text input:

```
camera min:1280x720 max:1280x720 min:15fps max:25fps
```

Is converted into an intermedia representation (via the `CaptureConfig`
utility class) that looks like the following:

```js
{
  camera: 0,
  microphone: 0,
  res: {
    min: { w: 1280, h: 720 },
    max: { w: 1280, h: 720 }
  },

  fps: {
    min: 15,
    max: 25
  }
}
```

Which in turn is converted into the following media constraints for
a getUserMedia call:

```js
{
  audio: true,
  video: {
    mandatory: {
      minFrameRate: 15,
      maxFrameRate: 25,

      minWidth: 1280,
      minHeight: 720,
      maxWidth: 1280,
      maxHeight: 720
    },

    optional: []
  }
}
```

### Targeted Device Capture

While the `rtc-captureconfig` module itself doesn't contain any media
identification logic, it is able to the sources information from a
`MediaStreamTrack.getSources` call to generate device targeted constraints.

For instance, the following example demonstrates how we can request
`camera:1` (the 2nd video device on our local machine) when we are making
a getUserMedia call:

```js
// load in capture config
var capture = require('rtc-captureconfig');

// pull in the getusermedia helper module
// see: https://github.com/HenrikJoreteg/getUserMedia
var getUserMedia = require('getusermedia');

// get the sources
MediaStreamTrack.getSources(function(sources) {
  var constraints = capture('camera:1').toConstraints({ sources: sources });

  /* here is an example of what the generated constraints actually look like
  var constraints = {
    audio:true,
    video: {
      mandatory: {},
      optional: [
        { sourceId: '30a3f6408175c22df739bcbf9573d841d9f99289' }
      ]
    }
  };
  */

  // get user media
  getUserMedia(constraints, function(err, stream) {
    if (err) {
      return console.log('Could not capture stream: ', err);
    }

    console.log('captured stream: ', stream);
  });
});
```

It's worth noting that if the requested device does not exist on the
machine (in the case above, if your machine only has a single webcam - as
is common) then no device selection constraints will be generated (i.e.
the standard `{ video: true, audio: true }` constraints will be returned
from the `toConstraints` call).

## Reference

### CaptureConfig

This is a utility class that is used to update capture configuration
details and is able to generate suitable getUserMedia constraints based
on the configuration.

#### camera(index)

Update the camera configuration to the specified index

#### microphone(index)

Update the microphone configuration to the specified index

#### max(data)

Update a maximum constraint.  If an fps constraint this will be directed
to the `maxfps` modifier.

#### maxfps(data)

Update the maximum fps

#### min(data)

Update a minimum constraint.  This can be either related to resolution
or FPS.

#### minfps(data)

Update the minimum fps

#### toConstraints(opts?)

Convert the internal configuration object to a valid media constraints
representation.  In compatible browsers a list of media sources can
be passed through in the `opts.sources` to create contraints that will
target a specific device when captured.

```js
var media = require('rtc-media');
var capture = require('rtc-captureconfig');

// get the sources
MediaStreamTrack.getSources(function(sources) {
  // get the cameras
  var cameras = sources.filter(function(info) {
    return info && info.kind === 'video';
  });

  // create videos
  var videos = cameras.map(function(info, idx) {
    return media(capture('camera:' + idx).toConstraints({ sources: sources }));
  });

  // render the videos
  videos.forEach(function(vid) {
    vid.render(document.body);
  });
});
```

### "Internal" methods

#### _parseRes(data)

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
