module.exports = {
  factory: function() {
    return {
      angle: 0,
      radius: 0,
      speed: 0.1
    };
  },
  reset: function(spinner) {
    spinner.angle = 0;
    spinner.radius = 0;
    spinner.speed = 0.1;
  }
};
