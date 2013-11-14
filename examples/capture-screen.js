// load in capture config
var capture = require('..');
var constraints = capture('screen').toConstraints();

// pull in the getusermedia helper module
// see: https://github.com/HenrikJoreteg/getUserMedia
var getUserMedia = require('getusermedia');

getUserMedia(constraints, function(err, stream) {
  if (err) {
    return console.log('Could not capture stream: ', err);
  }

  console.log('captured stream: ', stream);
});