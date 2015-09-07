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
    mandatory: {},
    optional: [
      { width: { min: 1280 } },
      { height: { min: 720 } }
    ]
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
    mandatory: {},
    optional: [
      { width: { max: 1280 } },
      { height: { max: 720 } }
    ]
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
    mandatory: {},
    optional: [
      { width: { min: 640, max: 1280 } },
      { height: { min: 480, max: 720 } }
    ]
  }
}, format.STANDARD));