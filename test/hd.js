var test = require('tape');
var expect = require('./helpers/expect-constraints');
var format = require('./helpers/format');

test('hd', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { minWidth: 1280 },
      { minHeight: 720 }
    ]
  }
}, format.LEGACY));

test('hd', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { width: { min: 1280 } },
      { height: { min: 720 } }
    ]
  }
}, format.STANDARD));

test('720p', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { minWidth: 1280 },
      { minHeight: 720 }
    ]
  }
}, format.LEGACY));

test('720p', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { width: { min: 1280 } },
      { height: { min: 720 } }
    ]
  }
}, format.STANDARD));

test('fullhd', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { minWidth: 1920 },
      { minHeight: 1080 }
    ]
  }
}, format.LEGACY));

test('fullhd', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { width: { min: 1920 } },
      { height: { min: 1080 } }
    ]
  }
}, format.STANDARD));

test('1080p', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { minWidth: 1920 },
      { minHeight: 1080 }
    ]
  }
}, format.LEGACY));

test('1080p', expect({
  audio: true,
  video: {
    mandatory: {},
    optional: [
      { width: { min: 1920 } },
      { height: { min: 1080 } }
    ]
  }
}, format.STANDARD));