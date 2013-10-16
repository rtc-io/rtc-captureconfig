var captureclass = require('../../');

module.exports = function(expected) {
  return function(t) {
    t.plan(1);
    t.deepEqual(expected, captureclass(t.name).cfg, JSON.stringify(expected));
  };
};