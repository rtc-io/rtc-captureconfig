'use strict';

var browser = require('detect-browser');
var compareVersions = require('compare-versions')

var capabilities = module.exports = {
	moz: typeof navigator != 'undefined' && !!navigator.mozGetUserMedia,
	browser: browser.name,
	browserVersion: browser.version
};

capabilities.constraintsType = (capabilities.moz && compareVersions(browser.version, '38.0.0') >= 0 ? 'standard' : 'legacy');