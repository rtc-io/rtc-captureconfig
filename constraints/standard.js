'use strict';

var rangeValues = ['min', 'max', 'ideal', 'exact'];

/**
  This constraints builder constructs MediaStreamConstraints in the current
  specification (http://w3c.github.io/mediacapture-main/getusermedia.html#mediastreamconstraints).

  This is currently used by Firefox 38+, and will presumably be implemented in other agents
  soon.

  It constructs constraints according to http://w3c.github.io/mediacapture-main/getusermedia.html#idl-def-MediaTrackConstraintSet
  Primarily, this involves numeric values being either expressed as a singular value (ie. frameRate: 15),
  or as a range (ie. frameRate: { min: 10, max: 30, ideal: 20 } ).

  A fully constructed constraint may look like the following:

  ```
  {
    audio: true,
    video: {
      optional: [
        { frameRate: { min: 15, max: 30 },
        { width: { min: 720, max: 1080 },
        { height: 480 }
      ]
    }
  }
  ```

  Important Note: This syntax, when passed to some non-implementing agents (ie. iOS, Temasys)
  will cause critical failures.

  ```
 **/
module.exports = function(attrName, data) {
  var value = {};
  var constraints = {};

  if (data.min && data.max && data.min === data.max) {
  	value = data.min;
  } else {
  	rangeValues.forEach(function(prop) {
  		if (data[prop]) value[prop] = data[prop];
  	});
  }
  constraints[attrName] = value;
  return [constraints];
};