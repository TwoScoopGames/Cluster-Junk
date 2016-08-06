"use strict";

module.exports = function(entity, game) {
  game.entities.set(entity, "eyes", {
    "blinkSound": "sfx-blink.mp3",
    "speed": 3.0,
    "pupilOffsetX": 0,
    "pupilOffsetY": 0,
    "lidFrame": 0,
    "lidTime": 0
  });
  game.entities.get(entity, "timers").switchToTitle.running = true;
};
