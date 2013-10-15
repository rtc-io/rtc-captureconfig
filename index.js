/* jshint node: true */
'use strict';

var reSeparator = /[\,\s]\s*/;

/**
  # rtc-streamclass

  This is a simple parser that takes a string of text and determines what
  that means in the context of WebRTC.

**/
module.exports = function(input) {
  // split into tokens on spaces
  var directives = input.split(reSeparator);

  // create a new configuration object
  var config = {};

  // 
  directives.forEach(function(directive) {

  });

  // iterate through the directives and apply our logic
  console.log(directives);

  return {};
};
