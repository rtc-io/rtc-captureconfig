var test = require('tape');
var expect = require('./helpers/expect');

test('camera microphone:off', expect({ camera: true, microphone: false }));
test('camera microphone:none', expect({ camera: true, microphone: false }));
test('camera microphone:false', expect({ camera: true, microphone: false }));