var test = require('tape');
var expect = require('./helpers/expect-constraints-mandatory');
var format = require('./helpers/format');

test('camera min:1280x720 15fps', expect({
  audio: true,
  video: {
    mandatory: {
      minFrameRate: 15,
      maxFrameRate: 15,
      frameRate: 15,
      minWidth: 1280,
      minHeight: 720,
    },
    optional: []
  }
}, format.LEGACY));


test('camera min:1280x720 15fps', expect({
  audio: true,
  video: {
    frameRate: 15,
    width: { min: 1280 },
    height: { min: 720 }
  }
}, format.STANDARD));

test('camera min:1280x720 max:1280x720 min:15fps max:25fps', expect({
  audio: true,
  video: {
    mandatory: {
      minFrameRate: 15,
      maxFrameRate: 25,
      minWidth: 1280,
      maxWidth: 1280,
      width: 1280,
      minHeight: 720,
      maxHeight: 720,
      height: 720
    },
    optional: []
  }
}, format.LEGACY));

test('camera min:1280x720 max:1280x720 min:15fps max:25fps', expect({
  audio: true,
  video: {
    frameRate: { min: 15, max: 25 },
    width: 1280,
    height: 720
  }
}, format.STANDARD));