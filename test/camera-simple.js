var test = require('tape');
var expect = require('./helpers/expect');

// single attribute tests
test('camera', expect({ camera: 0, microphone: 0 }));
test('camera:1', expect({ camera: 1, microphone: 0 }));
test('microphone', expect({ microphone: 0 }));
test('microphone:1', expect({ microphone: 1 }));

// camera + microphone
test('camera microphone:1', expect({ camera: 0, microphone: 1 }));
test('camera:1 microphone:2', expect({ camera:1, microphone: 2 }));
