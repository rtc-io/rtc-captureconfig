/* jshint node: true */
'use strict';

/**
  ## CaptureConfig

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
    microphone: 0
  };
}

module.exports = CaptureConfig;

/**
  ### camera(index)

  Update the camera configuration to the specified index
**/
CaptureConfig.prototype.camera = function(index) {
  // initialise the camera
  this.cfg.camera = parseInt(index || 0, 10);
};

/**
  ### microphone(index)

  Update the microphone configuration to the specified index
**/ 
CaptureConfig.prototype.microphone = function(index) {
  this.cfg.microphone = parseInt(index || 0, 10);
};

/**
  ### max(data)

  Update a maximum constraint.  If an fps constraint this will be directed
  to the `maxfps` modifier.

**/
CaptureConfig.prototype.max = function(data) {
  var res;

  // if this is an fps specification parse
  if (data.slice(-3) == 'fps') {
    return this.maxfps(data);
  }

  // parse the resolution
  res = this._parseRes(data);

  // initialise the fps config stuff
  this.cfg.res = this.cfg.res || {};
  this.cfg.res.max = res;
};

/**
  ### maxfps(data)

  Update the maximum fps
**/
CaptureConfig.prototype.maxfps = function(data) {
};

/**
  ### min(data)

  Update a minimum constraint.  This can be either related to resolution
  or FPS.
**/
CaptureConfig.prototype.min = function(data) {
  var res;

  // if this is an fps specification parse
  if (data.slice(-3) == 'fps') {
    return this.minfps(data);
  }

  // parse the resolution
  res = this._parseRes(data);

  // initialise the fps config stuff
  this.cfg.res = this.cfg.res || {};

  // add the min
  this.cfg.res.min = res;

  // if no max is currently specified, then add it now
  if (! this.cfg.res.max) {
    this.cfg.res.max = res;
  }
};

/**
  ### minfps(data)

  Update the minimum fps
**/
CaptureConfig.prototype.minfps = function(data) {
};

/**
  ### _parseRes(data) __internal__

  Parse a resolution specifier (e.g. 1280x720) into a simple JS object
  (e.g. { w: 1280, h: 720 })
**/
CaptureConfig.prototype._parseRes = function(data) {
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