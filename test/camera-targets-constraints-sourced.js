var test = require('tape');
var expect = require('./helpers/expect-constraints-sourced');

test('camera', expect({ video: true, audio: true }));
test('camera:1', expect({
  video: {
    mandatory: {},
    optional: [{ sourceId: 91 }]
  },
  audio: true
}));

test('microphone', expect({ video: false, audio: true }));
test('microphone:1', expect({
  video: false,
  audio: {
    mandatory: {},
    optional: [{ sourceId: 81 }]
  }
}));


test('camera microphone:1', expect({
  video:true,
  audio: {
    mandatory: {},
    optional: [{ sourceId: 81 }]
  }
}));

test('camera:1 microphone:2', expect({
  video: {
    mandatory: {},
    optional: [{ sourceId: 91 }]
  },
  audio: {
    mandatory: {},
    optional: [{ sourceId: 82 }]
  }
}));
