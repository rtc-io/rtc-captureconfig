/* jshint node: true */
'use strict';

var reSeparator = /[\,\s]\s*/;
var CaptureConfig = require('./capture-config');

/**
  # rtc-streamclass

  This is a simple parser that takes a string of text and determines what
  that means in the context of WebRTC.

  ## Reference

**/
module.exports = function(input) {
  // create a new configuration object using defaults
  var config = new CaptureConfig();

  // process each of the directives
  (input || '').split(reSeparator).forEach(function(directive) {
    // now further split the directive on the : character
    var parts = directive.split(':');
    var method = config[parts[0]];

    // if we have the method apply
    if (typeof method == 'function') {
      method.apply(config, parts.slice(1));
    }
  });

  return config;
};
