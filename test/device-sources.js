var test = require('tape');
var expect = require('./helpers/expect-constraints');
var format = require('./helpers/format');

var sources = [
	{deviceId: "default", kind: "audioinput", label: "Default", groupId: "2004946474"},
	{deviceId: "62b678fb9a24ad6a6996550510cf3d31c8de040cefa64306928ba24678d29de7", kind: "audioinput", label: "Built-in Microphone", groupId: "3235599890"},
	{deviceId: "a606cb3733d78040518504e7ab4db7b8d055fdc5248b22b1a31c3fb994ddaf2c",kind: "audioinput", label:"Display Audio", groupId: "1631477159"},
	{deviceId: "e41cc50bffcbdcb2657da1be1d2737055822f3bc63a8710d79bb6c0de20bd9d4",kind: "videoinput", label:"FaceTime HD Camera", groupId: ""},
	{deviceId: "67adbcba77241a069823633f0dfbf3b2ecc2d0bf5d499acf645e925f86c924ec",kind: "videoinput", label:"FaceTime HD Camera (Display) (05ac:1112)", groupId: ""},
	{deviceId: "default", kind: "audiooutput", label: "Default", groupId: "2004946474"},
	{deviceId: "40bf5c6a5024d15c434d3a0e60219151ce7e604abc15a58ecb8a26552bd99109",kind: "audiooutput", label:"AirPlay", groupId: "1000399423"},
	{deviceId: "8268ccad673144d9b6ab46065d21251be8287fe31e88f2e348f0d1dd5ca489d1",kind: "audiooutput", label:"Built-in Output", groupId: "4189744161"},
	{deviceId: "a606cb3733d78040518504e7ab4db7b8d055fdc5248b22b1a31c3fb994ddaf2c",kind: "audiooutput", label:"Display Audio", groupId: "1631477159"}
];

// single attribute tests
test('camera', expect({ video: true, audio: true }, format.LEGACY));
test('camera', expect({ video: true, audio: true }, format.STANDARD));
test('camera:1', expect({ video: true, audio: true }, format.LEGACY));
test('camera:1', expect({ video: true, audio: true }, format.STANDARD));

test('camera:e41cc50bffcbdcb2657da1be1d2737055822f3bc63a8710d79bb6c0de20bd9d4', expect({
	video: { deviceId: 'e41cc50bffcbdcb2657da1be1d2737055822f3bc63a8710d79bb6c0de20bd9d4' },
	audio: true
}), format.LEGACY);

test('camera:e41cc50bffcbdcb2657da1be1d2737055822f3bc63a8710d79bb6c0de20bd9d4', expect({
	video: { deviceId: { exact: 'e41cc50bffcbdcb2657da1be1d2737055822f3bc63a8710d79bb6c0de20bd9d4' } },
	audio: true
}), format.STANDARD);


test('microphone', expect({ video: false, audio: true }, format.LEGACY));
test('microphone', expect({ video: false, audio: true }, format.STANDARD));
test('microphone:1', expect({ video: false, audio: true }, format.LEGACY));
test('microphone:1', expect({ video: false, audio: true }, format.STANDARD));

// camera + microphone
test('camera microphone:1', expect({ video:true, audio: true }, format.LEGACY));
test('microphone:1', expect({ video: false, audio: true }, format.STANDARD));
test('camera:1 microphone:2', expect({ video: true, audio: true }, format.LEGACY));
test('microphone:1', expect({ video: false, audio: true }, format.STANDARD));
