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
  Returns a constraints builder for the appropriate version of the getUserMedia constraints
  that are required
 **/
module.exports = function(cfg, opts) {
  var constraintsType = (opts || {}).constraintsType || capabilities.constraintsType || 'legacy';
  var builder = builders[constraintsType];
  if (!builder) throw new Error('Unsupported constraints builder');
  return builder(cfg, opts);
};