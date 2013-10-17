var test = require('tape');
var expect = require('./helpers/expect-constraints');

test('camera microphone:off', expect({ video: true, audio: false }));
test('camera microphone:none', expect({ video: true, audio: false }));
test('camera microphone:false', expect({ video: true, audio: false }));