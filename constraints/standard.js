'use strict';

var detect = require('rtc-core/detect');
var rangeValues = ['min', 'max', 'ideal', 'exact'];

/**
  This constraints builder constructs MediaStreamConstraints in the current
  specification (http://w3c.github.io/mediacapture-main/getusermedia.html#mediastreamconstraints).

  This is currently used by Firefox 38+, and will presumably be implemented in other agents
  soon.

  It constructs constraints according to http://w3c.github.io/mediacapture-main/getusermedia.html#idl-def-MediaTrackConstraintSet
  Primarily, this involves numeric values being either expressed as a singular value (ie. frameRate: 15),
  or as a range (ie. frameRate: { min: 10, max: 30, ideal: 20 } ).

  It should also be noted that optional and mandatory constraints do not exist, rather have been replaced
  by the use of `exact`, `min`, `max`, and `ideal`, or the provision of a default preferred value.

  A fully constructed constraint may look like the following:

  ```
  {
    audio: true,
    video: {
      // Require a min of 15, max of 30
      frameRate: { min: 15, max: 30 },
      width: { min: 720, max: 1080 },
      // Prefer a height of 480
      height: 480
    }
  }
  ```

  Important Note: This syntax, when passed to some non-implementing agents (ie. iOS, Temasys)
  will cause critical failures.

  ```
 **/
module.exports = function(cfg, opts) {
  // Setup the config
  cfg = cfg || {};

  // Setup the default constraints
  var constraints = {
    audio: cfg.microphone === true ||
      (typeof cfg.microphone == 'number' && cfg.microphone >= 0),

    video: cfg.camera === true || cfg.share ||
      (typeof cfg.camera == 'number' && cfg.camera >= 0)
  };

  var media = {
    video: {},
    audio: {}
  };

  var sources = (opts || {}).sources || [];
  var cameras = sources.filter(function(info) {
    return info && info.kind === 'video';
  });
  var microphones = sources.filter(function(info) {
    return info && info.kind === 'audio';
  });
  var selectedSource;

  function addConstraints(mediaType, updatedConstraints) {
    if (!updatedConstraints) return;
    Object.keys(updatedConstraints).forEach(function(constraint) {
      if (!updatedConstraints[constraint]) return;
      media[mediaType][constraint] = updatedConstraints[constraint];
    });
  }

  // if we have screen constraints, make magic happen
  if (typeof cfg.share != 'undefined') {
    if (detect.moz) {
      media.video.mozMediaSource = media.video.mediaSource = 'window';
    } else {
      media.video.chromeMediaSource = 'screen';
    }
  }

  // fps
  if (cfg.fps) {
    addConstraints('video', buildConstraints('frameRate', cfg.fps, opts));
  }

  // min res specified
  if (cfg.res) {
    addConstraints('video', buildConstraints('width', {
      min: cfg.res.min && cfg.res.min.w,
      max: cfg.res.max && cfg.res.max.w
    }, opts));

    addConstraints('video', buildConstraints('height', {
      min: cfg.res.min && cfg.res.min.h,
      max: cfg.res.max && cfg.res.max.h
    }, opts));
  }

  // input camera selection
  if (typeof cfg.camera == 'number' && cameras.length) {
    selectedSource = cameras[cfg.camera];

    if (selectedSource) {
      addConstraints('video', { deviceId: { exact: selectedSource.id } });
    }
  }

  // input microphone selection
  if (typeof cfg.microphone == 'number' && microphones.length) {
    selectedSource = microphones[cfg.microphone];

    if (selectedSource) {
      addConstraints('audio', { deviceId: { exact: selectedSource.id } });
    }
  }

  ['video', 'audio'].forEach(function(target) {
    if (constraints[target] && Object.keys(media[target]).length > 0) {
      constraints[target] = media[target];
    }
  });

  return constraints;
};

function buildConstraints(attrName, data) {
  var value = {};
  var constraints = {};
  if (typeof data.min === 'number' && typeof data.max === 'number' && data.min === data.max) {
    if (data.min === 0) return;
  	value = data.min;
  } else {
  	rangeValues.forEach(function(prop) {
  		if (data[prop]) value[prop] = data[prop];
  	});
  }
  constraints[attrName] = value;
  return constraints;
};