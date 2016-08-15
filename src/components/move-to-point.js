module.exports = {
  factory: function() {
    return {
      x: 0,
      y: 0,
      maxDistanceAway: 0
    };
  },
  reset: function(moveToPoint) {
    moveToPoint.x = 0;
    moveToPoint.y = 0;
    moveToPoint.maxDistanceAway = 0;
    delete moveToPoint.script;
  }
};
