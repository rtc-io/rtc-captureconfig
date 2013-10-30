var test = require('tape');
var expect = require('./helpers/expect-constraints');

// single attribute tests
test('camera', expect({ video: true, audio: true }));
test('camera:1', expect({ video: true, audio: true }));


test('microphone', expect({ video: false, audio: true }));
test('microphone:1', expect({ video: false, audio: true }));

// camera + microphone
test('camera microphone:1', expect({ video:true, audio: true }));
test('camera:1 microphone:2', expect({ video: true, audio: true }));
