module.exports = {
  factory: function() {
    return {
      elapsed: 0
    };
  },
  reset: function(lightning) {
    lightning.elapsed = 0;
    delete lightning.points;
  }
};
