var test = require('tape');
var expect = require('./helpers/expect');

test('share', expect({
  share: 'window',
  microphone: false,
  res: {
    max: { w: 1920, h: 1080 }
  },
  aspectRatio: {
    min: 1.77
  }
}));

test('share:window', expect({
  share: 'window',
  microphone: false,
  res: {
    max: { w: 1920, h: 1080 }
  },
  aspectRatio: {
    min: 1.77
  }
}));
