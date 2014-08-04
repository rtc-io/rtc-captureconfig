var test = require('tape');
var expect = require('./helpers/expect-constraints');

test('camera 15fps', expect({
  audio: true,
  video: {
    mandatory: {},

    optional: [
      { minFrameRate: 15 },
      { maxFrameRate: 15 },
      { frameRate: 15 }
    ]
  }
}));

test('camera max:15fps', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { maxFrameRate: 15 },
      { frameRate: { max: 15 } }
    ]
  }
}));

test('camera min:25fps', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { minFrameRate: 25 },
      { frameRate: { min: 25 } }
    ]
  }
}));

test('camera min:15fps max:25fps', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { minFrameRate: 15 },
      { maxFrameRate: 25 },
      { frameRate: { min: 15, max: 25 } }
    ]
  }
}));
