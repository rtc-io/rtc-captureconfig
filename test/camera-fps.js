var test = require('tape');
var expect = require('./helpers/expect');

test('camera max:15fps', expect({
  camera: 0,
  microphone: 0,
  fps: {
    max: 15
  }
}));

test('camera min:25fps', expect({
  camera: 0,
  microphone: 0,
  fps: {
    min: 25
  }
}));

test('camera min:15fps max:25fps', expect({
  camera: 0,
  microphone: 0,
  fps: {
    min: 15,
    max: 25
  }
}));