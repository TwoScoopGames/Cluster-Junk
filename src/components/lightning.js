module.exports = {
  factory: function() {
    return {};
  },
  reset: function(lightning) {
    delete lightning.points;
  }
};
