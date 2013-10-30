var test = require('tape');
var expect = require('./helpers/expect');

test('camera max:15fps', expect({
  camera: true,
  microphone: true,
  fps: {
    max: 15
  }
}));

test('camera min:25fps', expect({
  camera: true,
  microphone: true,
  fps: {
    min: 25
  }
}));

test('camera min:15fps max:25fps', expect({
  camera: true,
  microphone: true,
  fps: {
    min: 15,
    max: 25
  }
}));