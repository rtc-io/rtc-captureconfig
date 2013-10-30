var captureconfig = require('../../');
var sources = [
  { kind: 'audio', id: 80, label: '' },
  { kind: 'video', id: 90, label: '' },
  { kind: 'audio', id: 81, label: '' },
  { kind: 'video', id: 91, label: '' },
  { kind: 'video', id: 92, label: '' },
  { kind: 'audio', id: 82, label: '' },
  { kind: 'audio', id: 83, label: '' }
];

module.exports = function(expected) {
  return function(t) {
    t.plan(1);
    t.deepEqual(
      captureconfig(t.name).toConstraints({ sources: sources }),
      expected,
      JSON.stringify(expected)
    );
  };
};