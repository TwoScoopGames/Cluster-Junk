module.exports = {
  factory: function() {
    return {
      angle: 0,
      radius: 0
    };
  },
  reset: function(spinner) {
    spinner.angle = 0;
    spinner.radius = 0;
  }
};
