/* jshint node: true */
'use strict';

var reSeparator = /[\,\s]\s*/;
var offFlags = ['false', 'none', 'off'];
var reFPS = /(\d+)fps/i;
var buildConstraints = require('./buildConstraints');


/**
  # rtc-captureconfig

  This is a simple parser that takes a string of text and determines what
  that means in the context of WebRTC.

  ## Why?

  It provides a simple, textual way of describing your requirements for
  media capture.  Trying to remember the structure of the constraints object
  is painful.

  ## How

  A simple text string is converted to an intermediate JS object
  representation, which can then be converted to a getUserMedia constraints
  data structure using a `toConstraints()` call.

  For example, the following text input:

  ```
  camera min:1280x720 max:1280x720 min:15fps max:25fps
  ```

  Is converted into an intermedia representation (via the `CaptureConfig`
  utility class) that looks like the following:

  ```js
  {
    camera: 0,
    microphone: 0,
    res: {
      min: { w: 1280, h: 720 },
      max: { w: 1280, h: 720 }
    },

    fps: {
      min: 15,
      max: 25
    }
  }
  ```

  Which in turn is converted into the following media constraints for
  a getUserMedia call:

  ```js
  {
    audio: true,
    video: {
      mandatory: {},
      optional: [
        { minFrameRate: 15 },
        { maxFrameRate: 25 },
        { frameRate: { min: 15, max: 25 } },

        { minWidth: 1280 },
        { maxWidth: 1280 },
        { width: 1280 },

        { minHeight: 720 },
        { maxHeight: 720 },
        { height: 720 }
      ]
    }
  }
  ```

  ### Experimental: Targeted Device Capture

  While the `rtc-captureconfig` module itself doesn't contain any media
  identification logic, it is able to the sources information from a
  `MediaStreamTrack.getSources` call to generate device targeted constraints.

  For instance, the following example demonstrates how we can request
  `camera:1` (the 2nd video device on our local machine) when we are making
  a getUserMedia call:

  <<< examples/camera-two.js

  It's worth noting that if the requested device does not exist on the
  machine (in the case above, if your machine only has a single webcam - as
  is common) then no device selection constraints will be generated (i.e.
  the standard `{ video: true, audio: true }` constraints will be returned
  from the `toConstraints` call).

  ### Experimental: Screen Capture

  If you are working with chrome and serving content of a HTTPS connection,
  then you will be able to experiment with experimental getUserMedia screen
  capture.

  In the simplest case, screen capture can be invoked by using the capture
  string of:

  ```
  screen
  ```

  Which generates the following contraints:

  ```js
  {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'screen'
      },

      optional: []
    }
  }
  ```

  ## Reference

**/

module.exports = function(input) {
  // create a new configuration object using defaults
  var config = new CaptureConfig();

  // process each of the directives
  (input || '').split(reSeparator).forEach(function(directive) {
    // now further split the directive on the : character
    var parts = directive.split(':');
    var method = config[(parts[0] || '').toLowerCase()];
    var fpsMatch = (! method) && reFPS.exec(parts[0]);

    // if we have an 'fps' directive then process
    if (fpsMatch) {
      method = config.fps;
      parts = [ 'fps', 15 ];
    }

    // if we have the method apply
    if (typeof method == 'function') {
      method.apply(config, parts.slice(1));
    }
  });

  return config;
};

/**
  ### CaptureConfig

  This is a utility class that is used to update capture configuration
  details and is able to generate suitable getUserMedia constraints based
  on the configuration.

**/
function CaptureConfig() {
  if (! (this instanceof CaptureConfig)) {
    return new CaptureConfig();
  }

  // initialise the base config
  this.cfg = {
    microphone: true
  };
}

var prot = CaptureConfig.prototype;

/**
  #### camera(index)

  Update the camera configuration to the specified index
**/
prot.camera = function(index) {
  this.cfg.camera = trueOrValue(index);
};

/**
  #### microphone(index)

  Update the microphone configuration to the specified index
**/
prot.microphone = function(index) {
  this.cfg.microphone = trueOrValue(index);
};

/**
  #### screen(target)

  Specify that we would like to capture the screen
**/
prot.screen = function() {
  // unset the microphone config
  delete this.cfg.microphone;

  // set the screen configuration
  this.cfg.screen = true;
};

/**
 #### _apply(prop, data)

 Parses and applies the resolution or fps from data to prop
**/
prot._apply = function(prop, data) {
  var res;

  // if this is an fps specification parse
  if (data.slice(-3).toLowerCase() == 'fps') {
    return this[prop + 'fps'](data);
  }

  // parse the resolution
  res = this._parseRes(data);

  // initialise the fps config stuff
  this.cfg.res = this.cfg.res || {};
  this.cfg.res[prop] = res;
}

/**
  #### max(data)

  Update a maximum constraint.  If an fps constraint this will be directed
  to the `maxfps` modifier.

**/
prot.max = function(data) {
  this._apply('max', data);
};

/**
  #### maxfps(data)

  Update the maximum fps
**/
prot.maxfps = function(data) {
  // ensure we have an fps component
  this.cfg.fps = this.cfg.fps || {};

  // set the max fps
  this.cfg.fps.max = parseFloat(data.slice(0, -3));
};

/**
  #### min(data)

  Update a minimum constraint.  This can be either related to resolution
  or FPS.
**/
prot.min = function(data) {
  this._apply('min', data);
};

/**
  #### minfps(data)

  Update the minimum fps
**/
prot.minfps = function(data) {
  // ensure we have an fps component
  this.cfg.fps = this.cfg.fps || {};

  // set the max fps
  this.cfg.fps.min = parseFloat(data.slice(0, -3));
};

/**
  #### ideal(data)

  Updates an ideal constraint.  This can be either related to resolution
  or FPS.
**/
prot.ideal = function(data) {
  this._apply('ideal', data);
};

/**
  #### idealfps(data)

  Sets the ideal fps
**/
prot.idealfps = function(data) {
  // ensure we have an fps component
  this.cfg.fps = this.cfg.fps || {};

  // set the max fps
  this.cfg.fps.ideal = parseFloat(data.slice(0, -3));
};

/**
  #### exact(data)

  Updates an exact constraint.  This can be either related to resolution
  or FPS.
**/
prot.exact = function(data) {
  this._apply('exact', data);
};

/**
  #### exactfps(data)

  Sets the exact fps
**/
prot.exactfps = function(data) {
  // ensure we have an fps component
  this.cfg.fps = this.cfg.fps || {};

  // set the max fps
  this.cfg.fps.exact = parseFloat(data.slice(0, -3));
};

prot.hd = prot['720p'] = function() {
  this.cfg.camera = true;
  this.min('1280x720');
};

prot.fullhd = prot['1080p'] = function() {
  this.cfg.camera = true;
  this.min('1920x1080');
};

prot.fps = function(fps) {
  this.cfg.fps = { min: fps, max: fps };
};

prot.hd = prot['720p'] = function() {
  this.cfg.camera = true;
  this.min('1280x720');
};

prot.fullhd = prot['1080p'] = function() {
  this.cfg.camera = true;
  this.min('1920x1080');
};

prot.fps = function(fps) {
  this.cfg.fps = { min: fps, max: fps };
};

/**
  #### share(target)

  Whether we want to capture a window rather than webcam source.

  ```
  share:window
  ```

  __NOTE:__ This feature must be supported by your browser (and you
  may need to have a suitable extension installed).
**/
prot.share = function(target) {
  this.cfg.share = target || 'window';
  this.cfg.microphone = false;

  // initialise a default max resolution
  this.max('1920x1080');

  // set a default min aspect ratio
  this.cfg.aspectRatio = {
    min: 1.77
  };
};

/**
  #### toConstraints(opts?)

  Convert the internal configuration object to a valid media constraints
  representation.  In compatible browsers a list of media sources can
  be passed through in the `opts.sources` to create contraints that will
  target a specific device when captured.

  <<< examples/capture-targets.js

**/
prot.toConstraints = function(opts) {
  // Create the constraints builder
  return buildConstraints(this.cfg, opts);
};

/**
  ### "Internal" methods
**/

/**
  #### _parseRes(data)

  Parse a resolution specifier (e.g. 1280x720) into a simple JS object
  (e.g. { w: 1280, h: 720 })
**/
prot._parseRes = function(data) {
  // split the data on the 'x' character
  var parts = data.split('x');

  // if we don't have two parts, then complain
  if (parts.length < 2) {
    throw new Error('Invalid resolution specification: ' + data);
  }

  // return the width and height object
  return {
    w: parseInt(parts[0], 10),
    h: parseInt(parts[1], 10)
  };
};

/* internal helper */

function trueOrValue(val) {
  if (typeof val == 'string' && offFlags.indexOf(val.toLowerCase()) >= 0) {
    return false;
  }

  return val === undefined || val === '' || parseInt(val || 0, 10);
}
