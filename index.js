/* jshint node: true */
'use strict';

var reSeparator = /[\,\s]\s*/;

/**
  # rtc-streamclass

  This is a simple parser that takes a string of text and determines what
  that means in the context of WebRTC.

**/
module.exports = function(input) {
  // create a new configuration object using defaults
  var config = { microphone: 0 };

  // process each of the directives
  (input || '').split(reSeparator).forEach(function(directive) {
    // now further split the directive on the : character
    var parts = directive.split(':');

    // make decisions based on the first part
    switch (parts[0]) {
      case 'camera': {
        config.camera = parseInt(parts[1] || 0, 10);
        break;
      }

      default: {

      }
    }
  });

  return config;
};
