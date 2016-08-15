"use strict";

module.exports = function(entity, game) {
  var eyes = game.entities.addComponent(entity, "eyes");
  eyes.blinkSound = "sfx-blink.mp3";
  eyes.speed = 3.0;

  game.entities.getComponent(entity, "timers").switchToTitle.running = true;
};
