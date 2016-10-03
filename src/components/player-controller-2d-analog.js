module.exports = {
  factory: function() {
    return {
      x: "left stick x",
      y: "left stick y"
    };
  },
  reset: function(playerController2dAnalog) {
    playerController2dAnalog.x = "left stick x";
    playerController2dAnalog.y = "left stick y";
  }
};
