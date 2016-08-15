module.exports = {
  factory: function() {
    return {
      x: 0
    };
  },
  reset: function(onPositionLeftOf) {
    onPositionLeftOf.x = 0;
    delete onPositionLeftOf.script;
  }
};
