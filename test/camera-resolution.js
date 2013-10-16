var test = require('tape');
var expect = require('./helpers/expect');

test('camera min:1280x720', expect({
  camera: 0,
  microphone: 0,
  res: {
    min: { w: 1280, h: 720 },
    max: { w: 1280, h: 720 }
  }
}));

test('camera min:640x480 max:1280x720', expect({
  camera: 0,
  microphone: 0,
  res: {
    min: { w: 640, h: 480 },
    max: { w: 1280, h: 720 }
  }
}));