var test = require('tape');
var expect = require('./helpers/expect-constraints-sourced');
var format = require('./helpers/format');

test('camera', expect({ video: true, audio: true }, format.LEGACY));
test('camera', expect({ video: true, audio: true }, format.STANDARD));
test('camera:1', expect({
  video: {
    mandatory: {},
    optional: [{ sourceId: 91 }]
  },
  audio: true
}, format.LEGACY));
test('camera:1', expect({
  video: {
    mandatory: {},
    optional: [{ sourceId: 91 }]
  },
  audio: true
}, format.STANDARD));

test('microphone', expect({ video: false, audio: true }, format.LEGACY));
test('microphone', expect({ video: false, audio: true }, format.STANDARD));

test('microphone:1', expect({
  video: false,
  audio: {
    mandatory: {},
    optional: [{ sourceId: 81 }]
  }
}, format.LEGACY));
test('microphone:1', expect({
  video: false,
  audio: {
    mandatory: {},
    optional: [{ sourceId: 81 }]
  }
}, format.STANDARD));


test('camera microphone:1', expect({
  video:true,
  audio: {
    mandatory: {},
    optional: [{ sourceId: 81 }]
  }
}, format.LEGACY));
test('camera microphone:1', expect({
  video:true,
  audio: {
    mandatory: {},
    optional: [{ sourceId: 81 }]
  }
}, format.STANDARD));

test('camera:1 microphone:2', expect({
  video: {
    mandatory: {},
    optional: [{ sourceId: 91 }]
  },
  audio: {
    mandatory: {},
    optional: [{ sourceId: 82 }]
  }
}, format.LEGACY));

test('camera:1 microphone:2', expect({
  video: {
    mandatory: {},
    optional: [{ sourceId: 91 }]
  },
  audio: {
    mandatory: {},
    optional: [{ sourceId: 82 }]
  }
}, format.STANDARD));