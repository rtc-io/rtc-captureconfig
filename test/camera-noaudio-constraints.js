var test = require('tape');
var expect = require('./helpers/expect-constraints');
var format = require('./helpers/format');

test('camera microphone:off', expect({ video: true, audio: false }, format.LEGACY));
test('camera microphone:off', expect({ video: true, audio: false }, format.STANDARD));
test('camera microphone:none', expect({ video: true, audio: false }, format.LEGACY));
test('camera microphone:none', expect({ video: true, audio: false }, format.STANDARD));
test('camera microphone:false', expect({ video: true, audio: false }, format.LEGACY));
test('camera microphone:false', expect({ video: true, audio: false }, format.STANDARD));