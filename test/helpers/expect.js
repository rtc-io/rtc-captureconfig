var captureconfig = require('../../');

module.exports = function(expected) {
  return function(t) {
    t.plan(1);
    t.deepEqual(
      captureconfig(t.name).cfg,
      expected,
      JSON.stringify(expected)
    );
  };
};