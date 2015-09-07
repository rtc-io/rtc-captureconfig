'use strict';
// Detect the capabilities
var capabilities = require('./capabilities');

// This is the extensible list of constraint builders
var builders = {
  // This is the current (August 25, 2015) specification for MediaTrackConstraints
  standard: require('./constraints/standard'),
  // This is the legacy specification that is still used by Chrome
  legacy: require('./constraints/legacy')
};

/**
  Constructs the appropriate constraints object, depending on the type of required
  constraints (ie. whether it adheres to the new constraints spec (Firefox 38+), the legacy
  constraints (Chrome, Firefox 37 and lower), or something else (ie. Opera, IE, iOS)
 **/
module.exports = function(attrName, data, opts) {
  var constraintsType = (opts || {}).constraintsType || capabilities.constraintsType || 'legacy';
  var builder = builders[constraintsType];
  if (!builder) throw new Error('Unsupported constraints builder');
  return builder(attrName, data);
};