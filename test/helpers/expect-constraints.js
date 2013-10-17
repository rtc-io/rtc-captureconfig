var captureclass = require('../../');

module.exports = function(expected) {
  return function(t) {
    t.plan(1);
    t.deepEqual(
      captureclass(t.name).toConstraints(),
      expected,
      JSON.stringify(expected)
    );
  };
};