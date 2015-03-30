var async = require('async');
var crel = require('crel');
var media = require('rtc-media');
var capture = require('..');
var resolutions = [
  '640x360',
  '320x240',
  '320x180'
];

function captureFrame(res, callback) {
  var constraints = capture('camera:0 min:' + res + ' max:' + res).toConstraints();

  media({ constraints: constraints })
    .on('error', callback)
    .on('capture', function(stream) {
    })
    .render(createContainer());
}

function createContainer() {
  var container = crel('div', {
    class: 'videocontainer'
  });

  document.body.appendChild(container);

  return container;
}

document.body.appendChild(crel('style', [
  '.videocontainer { width: 320px; overflow: hidden; }',
  '.videocontainer > * { object-fit: contain; width: 100%; height: 100%; }'
].join('\n')));

async.forEachSeries(resolutions, captureFrame, function(err) {
  if (err) {
    console.error(err);
  }
});
