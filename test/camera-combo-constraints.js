var test = require('tape');
var expect = require('./helpers/expect-constraints');

test('camera min:1280x720 min:15fps', expect({
  audio: true,
  video: {
    mandatory: {
      minFrameRate: 15,
      minWidth: 1280,
      minHeight: 720
    },

    optional: []
  }
}));

test('camera min:1280x720 max:1280x720 min:15fps max:25fps', expect({
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
}));