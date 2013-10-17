var test = require('tape');
var expect = require('./helpers/expect-constraints');

test('camera max:15fps', expect({
  audio: true,
  video: {
    mandatory: {
      maxFrameRate: 15
    },

    optional: []
  }
}));

test('camera min:25fps', expect({
  audio: true,
  video: {
    mandatory: {
      minFrameRate: 25
    },

    optional: []
  }
}));

test('camera min:15fps max:25fps', expect({
  audio: true,
  video: {
    mandatory: {
      minFrameRate: 15,
      maxFrameRate: 25
    },

    optional: []
  }
}));