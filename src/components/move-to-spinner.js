module.exports = {
  factory: function() {
    return {
      id: 0,
      angle: 0
    };
  },
  reset: function(spinner) {
    spinner.id = 0;
    spinner.angle = 0;
  }
};
