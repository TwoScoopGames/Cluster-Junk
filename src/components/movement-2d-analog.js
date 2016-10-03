module.exports = {
  factory: function() {
    return {
      accel: 0.02,
      angle: 0,
      magnitude: 0,
      max: 1
    };
  },
  reset: function(movement2dAnalog) {
    movement2dAnalog.accel = 0.02;
    movement2dAnalog.angle = 0;
    movement2dAnalog.magnitude = 0;
    movement2dAnalog.max = 1.0;
  }
};
