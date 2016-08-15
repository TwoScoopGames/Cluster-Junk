module.exports = {
  factory: function() {
    return {
      pupilOffsetX: 0,
      pupilOffsetY: 0,
      lidFrame: 0,
      lidTime: 0
    };
  },
  reset: function(eyes) {
    eyes.pupilOffsetX = 0;
    eyes.pupilOffsetY = 0;
    eyes.lidFrame = 0;
    eyes.lidTime = 0;
    delete eyes.blinkSound;
    delete eyes.script;
    delete eyes.speed;
  }
};
