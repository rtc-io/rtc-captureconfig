var streamclass = require('../../');

module.exports = function(expected) {
  return function(t) {
    t.plan(1);
    t.deepEqual(expected, streamclass(t.name));
  };
};