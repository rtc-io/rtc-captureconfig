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