// load in capture config
var capture = require('..');

// pull in the getusermedia helper module
// see: https://github.com/HenrikJoreteg/getUserMedia
var getUserMedia = require('getusermedia');

// get the sources
MediaStreamTrack.getSources(function(sources) {
  var constraints = capture('camera:1').toConstraints({ sources: sources });

  // get user media
  getUserMedia(constraints, function(err, stream) {
    if (err) {
      return console.log('Could not capture stream: ', err);
    }

    console.log('captured stream: ', stream);
  });
});