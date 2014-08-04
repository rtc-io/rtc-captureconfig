var extend = require('cog/extend');

function createAttr(prefix, attrName, value) {
  var attr = {};
  var key = prefix && (prefix + attrName.slice(0, 1).toUpperCase() + attrName.slice(1));

  attr[key || attrName] = value;
  return attr;
}

module.exports = function(attrName, data) {
  var output = [];
  var combined;

  if (data.min) {
    combined = {
      min: data.min
    };

    output.push(createAttr('min', attrName, data.min));
  }

  if (data.max) {
    combined = extend(combined || {}, {
      max: data.max
    });

    output.push(createAttr('max', attrName, data.max));
  }

  if (data.min && data.max && data.min === data.max) {
    combined = data.min;
  }

  output.push(createAttr(null, attrName, combined));

  return output;
};
