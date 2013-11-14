var test = require('tape');
var expect = require('./helpers/expect-constraints');

// single attribute tests
test('screen', expect({
  audio: false,
  video: {
    mandatory: {
      chromeMediaSource: 'screen'
    },

    optional: []
  }
}));