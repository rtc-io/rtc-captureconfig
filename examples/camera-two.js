// load in capture config
var capture = require('..');

// pull in the getusermedia helper module
// see: https://github.com/HenrikJoreteg/getUserMedia
var getUserMedia = require('getusermedia');

// get the sources
MediaStreamTrack.getSources(function(sources) {
  var constraints = capture('camera:1').toConstraints({ sources: sources });

  /* here is an example of what the generated constraints actually look like
  var constraints = {
    audio:true,
    video: {
      mandatory: {},
      optional: [
        { sourceId: '30a3f6408175c22df739bcbf9573d841d9f99289' }
      ]
    }
  };
  */

  // get user media
  getUserMedia(constraints, function(err, stream) {
    if (err) {
      return console.log('Could not capture stream: ', err);
    }

    console.log('captured stream: ', stream);
  });
});