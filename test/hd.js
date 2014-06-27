var test = require('tape');
var expect = require('./helpers/expect-constraints');

test('hd', expect({
  audio: true,
  video: {
    mandatory: {
      minWidth: 1280,
      minHeight: 720
    },

    optional: []
  }
}));

test('720p', expect({
  audio: true,
  video: {
    mandatory: {
      minWidth: 1280,
      minHeight: 720
    },

    optional: []
  }
}));

test('fullhd', expect({
  audio: true,
  video: {
    mandatory: {
      minWidth: 1920,
      minHeight: 1080
    },

    optional: []
  }
}));

test('1080p', expect({
  audio: true,
  video: {
    mandatory: {
      minWidth: 1920,
      minHeight: 1080
    },

    optional: []
  }
}));

