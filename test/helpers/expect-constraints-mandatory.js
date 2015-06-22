var captureconfig = require('../../');

module.exports = function(expected) {
  return function(t) {
    t.plan(1);
    t.deepEqual(
      captureconfig(t.name).toConstraints({ useMandatory: true }),
      expected,
      JSON.stringify(expected)
    );
  };
};