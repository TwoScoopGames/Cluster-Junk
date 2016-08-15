"use strict";

module.exports = function(entity, game) {
  var eyes = game.entities.addComponent(entity, "eyes");
  eyes.blinkSound = "sfx-blink.mp3";
  eyes.speed = 3.0;
  eyes.pupilOffsetX = 0;
  eyes.pupilOffsetY = 0;
  eyes.lidFrame = 0;
  eyes.lidTime = 0;
  game.entities.getComponent(entity, "timers").switchToTitle.running = true;
};
