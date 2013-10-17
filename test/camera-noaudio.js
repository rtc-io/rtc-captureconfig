var test = require('tape');
var expect = require('./helpers/expect');

test('camera microphone:off', expect({ camera: 0, microphone: undefined }));
test('camera microphone:none', expect({ camera: 0, microphone: undefined }));
test('camera microphone:false', expect({ camera: 0, microphone: undefined }));