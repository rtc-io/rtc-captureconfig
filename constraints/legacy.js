'use strict';

var detect = require('rtc-core/detect');
var extend = require('cog/extend');

/**
  This constraints builder constructs MediaStreamConstraints in the form
  that was originally proposed, and used in Chrome (currently), Firefox (<=37),
  Internet Explorer (Temasys) and iOS.

  It constructs constraints in the form of min{attrName}: {value}, so a fully
  constructed constraint may look like the following:

  ```
  {
    audio: true,
    video: {
      optional: [
        { minFrameRate: 15 },
        { maxFrameRate: 30 },
        { minWidth: 720 },
        { maxWidth: 1080 }
      ]
    }
  }
  ```

  It will also NOT produce any combined syntax which would produce failures
  such as
  ```
  {
    frameRate: { min: 15, max: 30 }
  }
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

  // mandatory constraints
  var m = {
    video: {},
    audio: {}
  };

  // optional constraints
  var o = {
    video: [],
    audio: []
  };

  var sources = (opts || {}).sources || [];
  var cameras = sources.filter(function(info) {
    return info && info.kind === 'video';
  });
  var microphones = sources.filter(function(info) {
    return info && info.kind === 'audio';
  });
  var selectedSource;
  var useMandatory = !!(opts || {}).useMandatory;

  function addConstraints(section, constraints) {
    if (useMandatory) {
      return extend.apply(null, [m[section]].concat(constraints));
    }

    o[section] = o[section].concat(constraints);
  }

  function complexConstraints(target) {
    if (constraints[target] && typeof constraints[target] != 'object') {
      constraints[target] = {
        mandatory: m[target],
        optional: o[target]
      };
    }
  }

  // if we have screen constraints, make magic happen
  if (typeof cfg.share != 'undefined') {
    complexConstraints('video');
    if (detect.moz) {
      constraints.video.mozMediaSource = constraints.video.mediaSource = 'window';
    }
    else {
      m.video.chromeMediaSource = 'screen';
    }
  }

  // fps
  if (cfg.fps) {
    complexConstraints('video');
    addConstraints('video', buildConstraints('frameRate', cfg.fps, opts));
  }

  // min res specified
  if (cfg.res) {
    complexConstraints('video');

    addConstraints('video', buildConstraints('width', {
      min: cfg.res.min && cfg.res.min.w,
      max: cfg.res.max && cfg.res.max.w,
      ideal: cfg.res.ideal && cfg.res.ideal.w,
      exact: cfg.res.exact && cfg.res.exact.w,
    }, opts));

    addConstraints('video', buildConstraints('height', {
      min: cfg.res.min && cfg.res.min.h,
      max: cfg.res.max && cfg.res.max.h,
      ideal: cfg.res.ideal && cfg.res.ideal.h,
      exact: cfg.res.exact && cfg.res.exact.h,
    }, opts));
  }

  // input camera selection
  if (typeof cfg.camera == 'number' && cameras.length) {
    selectedSource = cameras[cfg.camera];

    if (selectedSource) {
      complexConstraints('video');
      addConstraints('video', { sourceId: selectedSource.id });
    }
  }

  // input microphone selection
  if (typeof cfg.microphone == 'number' && microphones.length) {
    selectedSource = microphones[cfg.microphone];

    if (selectedSource) {
      complexConstraints('audio');
      addConstraints('audio', { sourceId: selectedSource.id });
    }
  }

  ['video', 'audio'].forEach(function(target) {
    if (constraints[target] && constraints[target].optional) {
      constraints[target].optional = o[target];
    }
  });

  return constraints;
};

/**
  Builds an attribute constraint in the legacy format
 **/
function buildConstraints(attrName, data) {
  var output = [];

  if (data.ideal && !data.max) {
    data.max = data.ideal;
  }

  if (data.exact) {
    data.min = data.max = data.exact;
  }

  if (data.min) {
    output.push(createAttr('min', attrName, data.min));
  }

  if (data.max) {
    output.push(createAttr('max', attrName, data.max));
  }

  if (data.min && data.max && data.min === data.max) {
    output.push(createAttr(null, attrName, data.min));
  }
  return output;
};

/**
  Creates the attribute with the given value
 **/
function createAttr(prefix, attrName, value) {
  var attr = {};
  var key = prefix && (prefix + attrName.slice(0, 1).toUpperCase() + attrName.slice(1));

  attr[key || attrName] = value;
  return attr;
}