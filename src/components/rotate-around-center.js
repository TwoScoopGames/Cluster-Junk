module.exports = {
  factory: function() {
    return {
      speed: 0
    };
  },
  reset: function(rotateAroundCenter) {
    rotateAroundCenter.speed = 0;
    delete rotateAroundCenter.script;
  }
};
