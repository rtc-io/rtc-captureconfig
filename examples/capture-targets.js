var media = require('rtc-media');
var capture = require('..');

// get the sources
MediaStreamTrack.getSources(function(sources) {
  // get the cameras
  var cameras = sources.filter(function(info) {
    return info && info.kind === 'video';
  });

  // create videos
  var videos = cameras.map(function(info, idx) {
    return media(capture('camera:' + idx).toConstraints({ sources: sources }));
  });

  // render the videos
  videos.forEach(function(vid) {
    vid.render(document.body);
  });
});