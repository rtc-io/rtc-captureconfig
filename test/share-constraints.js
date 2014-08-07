var detect = require('rtc-core/detect');
var extend = require('cog/extend');
var test = require('tape');
var expect = require('./helpers/expect-constraints');

function mozMediaSource(type) {
  return {
    mozMediaSource: type,
    mediaSource: type
  };
}

test('share', expect({
  audio: false,
  video: extend(detect.moz ? mozMediaSource('window') : {}, {
    mandatory: detect.moz ? {} : {
      chromeMediaSource: 'screen'
    },
    optional: [
      { maxWidth: 1920 },
      { width: { max: 1920 } },
      { maxHeight: 1080 },
      { height: { max: 1080 } }
    ]
  })
}));

test('share:window', expect({
  audio: false,
  video: extend(detect.moz ? mozMediaSource('window') : {}, {
    mandatory: detect.moz ? {} : {
      chromeMediaSource: 'screen'
    },
    optional: [
      { maxWidth: 1920 },
      { width: { max: 1920 } },
      { maxHeight: 1080 },
      { height: { max: 1080 } }
    ]
  })
}));
