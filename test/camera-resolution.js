var test = require('tape');
var expect = require('./helpers/expect');

test('camera min:1280x720', expect({
  camera: true,
  microphone: true,
  res: {
    min: { w: 1280, h: 720 }
  }
}));

test('camera max:1280x720', expect({
  camera: true,
  microphone: true,
  res: {
    max: { w: 1280, h: 720 }
  }
}));

test('camera min:640x480 max:1280x720', expect({
  camera: true,
  microphone: true,
  res: {
    min: { w: 640, h: 480 },
    max: { w: 1280, h: 720 }
  }
}));