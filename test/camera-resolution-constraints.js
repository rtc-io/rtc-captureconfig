var test = require('tape');
var expect = require('./helpers/expect-constraints');
var format = require('./helpers/format');

test('camera min:1280x720', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { minWidth: 1280 },
      { minHeight: 720 }
    ]
  }
}, format.LEGACY));

test('camera min:1280x720', expect({
  audio: true,
  video: {
    width: { min: 1280 },
    height: { min: 720 }
  }
}, format.STANDARD));

test('camera max:1280x720', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { maxWidth: 1280 },
      { maxHeight: 720 }
    ]
  }
}, format.LEGACY));

test('camera max:1280x720', expect({
  audio: true,
  video: {
    width: { max: 1280 },
    height: { max: 720 }
  }
}, format.STANDARD));

test('camera min:640x480 max:1280x720', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { minWidth: 640 },
      { maxWidth: 1280 },

      { minHeight: 480 },
      { maxHeight: 720 }
    ]
  }
}, format.LEGACY));

test('camera min:640x480 max:1280x720', expect({
  audio: true,
  video: {
    width: { min: 640, max: 1280 },
    height: { min: 480, max: 720 }
  }
}, format.STANDARD));

test('camera ideal:640x480 ', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { maxWidth: 640 },
      { maxHeight: 480 }
    ]
  }
}, format.LEGACY));

test('camera ideal:640x480', expect({
  audio: true,
  video: {
    width: { ideal: 640 },
    height: { ideal: 480 }
  }
}, format.STANDARD));

test('camera ideal:640x480 min:320x240', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { minWidth: 320 },
      { maxWidth: 640 },
      { minHeight: 240 },
      { maxHeight: 480 }
    ]
  }
}, format.LEGACY));

test('camera ideal:640x480 min:320x240', expect({
  audio: true,
  video: {
    width: { ideal: 640, min: 320 },
    height: { ideal: 480, min: 240 }
  }
}, format.STANDARD));

test('camera exact:640x480 ', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { minWidth: 640 },
      { maxWidth: 640 },
      { width: 640 },
      { minHeight: 480 },
      { maxHeight: 480 },
      { height: 480 }
    ]
  }
}, format.LEGACY));

test('camera exact:640x480', expect({
  audio: true,
  video: {
    width: { exact: 640 },
    height: { exact: 480 }
  }
}, format.STANDARD));