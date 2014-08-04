var test = require('tape');
var expect = require('./helpers/expect-constraints');

test('hd', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { minWidth: 1280 },
      { width: { min: 1280 } },
      { minHeight: 720 },
      { height: { min: 720 } }
    ]
  }
}));

test('720p', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { minWidth: 1280 },
      { width: { min: 1280 } },
      { minHeight: 720 },
      { height: { min: 720 } }
    ]
  }
}));

test('fullhd', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { minWidth: 1920 },
      { width: { min: 1920 } },
      { minHeight: 1080 },
      { height: { min: 1080 } }
    ]
  }
}));

test('1080p', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { minWidth: 1920 },
      { width: { min: 1920 } },
      { minHeight: 1080 },
      { height: { min: 1080 } }
    ]
  }
}));

