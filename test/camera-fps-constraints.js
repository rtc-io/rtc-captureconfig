var test = require('tape');
var expect = require('./helpers/expect-constraints');
var format = require('./helpers/format');

test('camera 15fps', expect({
  audio: true,
  video: {
    mandatory: {},

    optional: [
      { minFrameRate: 15 },
      { maxFrameRate: 15 },
      { frameRate: 15 }
    ]
  }
}, format.LEGACY));

test('camera 15fps', expect({
  audio: true,
  video: {
    frameRate: 15
  }
}, format.STANDARD));

test('camera max:15fps', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { maxFrameRate: 15 },
    ]
  }
}, format.LEGACY));

test('camera max:15fps', expect({
  audio: true,
  video: {
    frameRate: { max: 15 }
  }
}, format.STANDARD));

test('camera min:25fps', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { minFrameRate: 25 }
    ]
  }
}, format.LEGACY));

test('camera min:25fps', expect({
  audio: true,
  video: {
    frameRate: { min: 25 }
  }
}, format.STANDARD));

test('camera min:15fps max:25fps', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { minFrameRate: 15 },
      { maxFrameRate: 25 }
    ]
  }
}, format.LEGACY));

test('camera min:15fps max:25fps', expect({
  audio: true,
  video: {
    frameRate: { min: 15, max: 25 }
  }
}, format.STANDARD));