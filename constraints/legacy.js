'use strict';

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
module.exports = function(attrName, data) {
  var output = [];

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

function createAttr(prefix, attrName, value) {
  var attr = {};
  var key = prefix && (prefix + attrName.slice(0, 1).toUpperCase() + attrName.slice(1));

  attr[key || attrName] = value;
  return attr;
}
