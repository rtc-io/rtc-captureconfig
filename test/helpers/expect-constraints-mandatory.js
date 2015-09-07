var extend = require('cog/extend');
var captureconfig = require('../../');

module.exports = function(expected, opts) {
  return function(t) {
    t.plan(1);
    t.deepEqual(
      captureconfig(t.name).toConstraints(extend({ useMandatory: true }, opts || {})),
      expected,
      JSON.stringify(expected)
    );
  };
};