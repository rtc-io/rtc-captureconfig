'use strict';

var browser = require('detect-browser').detect();
var compareVersions = require('compare-versions')

var capabilities = module.exports = {
	moz: typeof navigator != 'undefined' && !!navigator.mozGetUserMedia,
	browser: browser.name,
	browserVersion: browser.version
};

// Mozilla constraings handling
if (capabilities.moz) {
	capabilities.constraintsType = (compareVersions(browser.version, '38.0.0') >= 0 ? 'standard' : 'legacy');
}
// Chrome constraints handling
else if (browser.name === 'chrome') {
	capabilities.constraintsType = (compareVersions(browser.version, '53.0.0') >= 0 ? 'standard' : 'legacy');
}
// Safari constraints handling
else if (browser.name === 'safari') {
	capabilities.constraintsType = (compareVersions(browser.version, '12.0.0') >= 0 ? 'standard' : 'legacy');
}
// iOS Safari constraints handling
else if (browser.name === 'ios') {
	capabilities.constraintsType = (compareVersions(browser.version, '11.0.0') >= 0 ? 'standard' : 'legacy');
}
// Default constraints handling
else {
	capabilities.constraintsType = 'legacy';
}