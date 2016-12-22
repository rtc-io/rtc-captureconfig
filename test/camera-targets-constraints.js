var test = require('tape');
var expect = require('./helpers/expect-constraints');
var format = require('./helpers/format');

// single attribute tests
test('camera', expect({ video: true, audio: true }, format.LEGACY));
test('camera', expect({ video: true, audio: true }, format.STANDARD));
test('camera:1', expect({ video: true, audio: true }, format.LEGACY));
test('camera:1', expect({ video: true, audio: true }, format.STANDARD));

test('camera:1 min:320x240', expect({
	video: {
		mandatory: {},
	    optional: [
	      { minWidth: 320 },
	      { minHeight: 240 }
	    ]
	},
	audio: true
}, format.LEGACY));
test('camera:1 min:320x240', expect({
	video: {
	    width: { min: 320 },
	    height: { min: 240 }
	},
	audio: true
}, format.STANDARD));


test('microphone', expect({ video: false, audio: true }, format.LEGACY));
test('microphone', expect({ video: false, audio: true }, format.STANDARD));
test('microphone:1', expect({ video: false, audio: true }, format.LEGACY));
test('microphone:1', expect({ video: false, audio: true }, format.STANDARD));

// camera + microphone
test('camera microphone:1', expect({ video:true, audio: true }, format.LEGACY));
test('microphone:1', expect({ video: false, audio: true }, format.STANDARD));
test('camera:1 microphone:2', expect({ video: true, audio: true }, format.LEGACY));
test('microphone:1', expect({ video: false, audio: true }, format.STANDARD));
