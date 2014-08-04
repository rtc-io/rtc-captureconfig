var test = require('tape');
var expect = require('./helpers/expect-constraints');

test('camera min:1280x720', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { minWidth: 1280 },
      { width: { min: 1280 } },
      { minHeight: 720 },
      { height: { min: 720 } }
    ]
  }
}));

test('camera max:1280x720', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { maxWidth: 1280 },
      { width: { max: 1280 } },
      { maxHeight: 720 },
      { height: { max: 720 } }
    ]
  }
}));

test('camera min:640x480 max:1280x720', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { minWidth: 640 },
      { maxWidth: 1280 },
      { width: { min: 640, max: 1280 } },

      { minHeight: 480 },
      { maxHeight: 720 },
      { height: { min: 480, max: 720 } }
    ]
  }
}));
