var test = require('tape');
var expect = require('./helpers/expect');

// single attribute tests
test('camera', expect({ camera: true, microphone: true }));
test('camera:1', expect({ camera: 1, microphone: true }));
test('microphone', expect({ microphone: true }));
test('microphone:1', expect({ microphone: 1 }));

// camera + microphone
test('camera microphone:1', expect({ camera: true, microphone: 1 }));
test('camera:1 microphone:2', expect({ camera: 1, microphone: 2 }));

test('camera min:320x240 microphone:1', expect({
	camera: true,
	microphone: 1,
	res: {
		min: { w: 320, h: 240 }
	}
}));
test('camera:1 ideal:640x480 microphone:2', expect({
	camera: 1,
	microphone: 2,
	res: {
		ideal: { w: 640, h: 480 }
	}
}));