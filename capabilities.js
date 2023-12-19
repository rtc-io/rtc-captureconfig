"use strict"

const browser = require("detect-browser").detect()
const compareVersions = require("compare-versions")

const capabilities = (module.exports = {
  moz: typeof navigator != "undefined" && !!navigator.mozGetUserMedia,
  browser: browser.name,
  browserVersion: browser.version,
})

const getConstraintsType = (condition: boolean) =>
  condition ? "standard" : "legacy"

// Mozilla constraings handling
if (capabilities.moz) {
  capabilities.constraintsType = getConstraintsType(
    compareVersions(browser.version, "38.0.0") >= 0
  )
}
// Chrome constraints handling
else if (browser.name === "chrome") {
  capabilities.constraintsType = getConstraintsType(
    compareVersions(browser.version, "53.0.0") >= 0
  )
}
// Chrome on iOS constraints handling
else if (browser.name === "crios") {
  capabilities.constraintsType = getConstraintsType(
    compareVersions(browser.version, "56.0.0") >= 0
  )
}
// Safari constraints handling
else if (browser.name === "safari") {
  capabilities.constraintsType = getConstraintsType(
    compareVersions(browser.version, "12.0.0") >= 0
  )
}
// Edge constraints handling
else if (/^edge.*$/.test(browser.name)) {
  capabilities.constraintsType = getConstraintsType(
    compareVersions(browser.version, "79.0.0") >= 0
  )
}
// iOS Safari constraints handling
else if (browser.name === "ios") {
  capabilities.constraintsType = getConstraintsType(
    compareVersions(browser.version, "11.0.0") >= 0
  )
}
// Default constraints handling
else {
  capabilities.constraintsType = "legacy"
}
