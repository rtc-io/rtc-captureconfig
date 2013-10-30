var test = require('tape');
var expect = require('./helpers/expect');

test('camera min:1280x720 min:15fps', expect({
  camera: true,
  microphone: true,
  res: {
    min: { w: 1280, h: 720 }
  },

  fps: {
    min: 15
  }
}));

test('camera min:1280x720 max:1280x720 min:15fps max:25fps', expect({
  camera: true,
  microphone: true,
  res: {
    min: { w: 1280, h: 720 },
    max: { w: 1280, h: 720 }
  },

  fps: {
    min: 15,
    max: 25
  }
}));