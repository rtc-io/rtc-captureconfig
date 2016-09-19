var detect = require('rtc-core/detect');
var extend = require('cog/extend');
var test = require('tape');
var expect = require('./helpers/expect-constraints');
var format = require('./helpers/format');

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
      { maxHeight: 1080 }
    ]
  })
}, format.LEGACY));

test('share', expect({
  audio: false,
  video: extend(detect.moz ? mozMediaSource('window') : {},
    detect.moz ? {
      width: { max: 1920 },
      height: { max: 1080 }
    } : {
      chromeMediaSource: 'screen',
      width: { max: 1920 },
      height: { max: 1080 }
    }
  )
}, format.STANDARD));

test('share:window', expect({
  audio: false,
  video: extend(detect.moz ? mozMediaSource('window') : {}, {
    mandatory: detect.moz ? {} : {
      chromeMediaSource: 'screen'
    },
    optional: [
      { maxWidth: 1920 },
      { maxHeight: 1080 }
    ]
  })
}, format.LEGACY));

test('share:window', expect({
  audio: false,
  video: extend(detect.moz ? mozMediaSource('window') : {},
    detect.moz ? {
      width: { max: 1920 },
      height: { max: 1080 }
    } : {
      chromeMediaSource: 'screen',
      width: { max: 1920 },
      height: { max: 1080 }
    }
  )
}, format.STANDARD));