var test = require('tape');
var expect = require('./helpers/expect-constraints');

test('camera min:1280x720', expect({
  audio: true,
  video: {
    mandatory: {
      minWidth: 1280,
      minHeight: 720
    },

    optional: []
  }
}));

test('camera max:1280x720', expect({
  audio: true,
  video: {
    mandatory: {
      maxWidth: 1280,
      maxHeight: 720
    },

    optional: []
  }
}));

test('camera min:640x480 max:1280x720', expect({
  audio: true,
  video: {
    mandatory: {
      minWidth: 640,
      minHeight: 480,
      maxWidth: 1280,
      maxHeight: 720
    },

    optional: []
  }
}));