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
    deviceId: { exact: 91 }
  },
  audio: true
}, format.STANDARD));

// Test with resolution conditions
test('camera:1 min:320x240', expect({
  video: {
    mandatory: {},
    optional: [
      { minWidth: 320 },
      { minHeight: 240 },
      { sourceId: 91 }
    ]
  },
  audio: true
}, format.LEGACY));
test('camera:1 min:320x240', expect({
  video: {
    deviceId: { exact: 91 },
    width: { min: 320 },
    height: { min: 240 }
  },
  audio: true
}, format.STANDARD));

// Test with audio conditions
test('camera:1 min:320x240 microphone:1', expect({
  video: {
    mandatory: {},
    optional: [
      { minWidth: 320 },
      { minHeight: 240 },
      { sourceId: 91 }
    ]
  },
  audio: {
    mandatory: {},
    optional: [
      { sourceId: 81 }
    ]
  }
}, format.LEGACY));
test('camera:1 min:320x240 microphone:1', expect({
  video: {
    deviceId: { exact: 91 },
    width: { min: 320 },
    height: { min: 240 }
  },
  audio: {
    deviceId: { exact: 81 }
  }
}, format.STANDARD));

// Test with ideal and audio conditions
test('camera:1 ideal:800x600 microphone:1', expect({
  video: {
    mandatory: {},
    optional: [
      { maxWidth: 800 },
      { maxHeight: 600 },
      { sourceId: 91 }
    ]
  },
  audio: {
    mandatory: {},
    optional: [
      { sourceId: 81 }
    ]
  }
}, format.LEGACY));
test('camera:1 ideal:800x600 microphone:1', expect({
  video: {
    deviceId: { exact: 91 },
    width: { ideal: 800 },
    height: { ideal: 600 }
  },
  audio: {
    deviceId: { exact: 81 }
  }
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
    deviceId: { exact: 81 }
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
    deviceId: { exact: 81 }
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
    deviceId: { exact: 91 }
  },
  audio: {
    deviceId: { exact: 82 }
  }
}, format.STANDARD));