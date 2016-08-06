"use strict";

module.exports = function(entity, game) {
  var viewport = 0;
  var camera = 1;
  game.entities.get(viewport, "follow").distance = 0;
  game.entities.remove(camera, "matchCanvasSize");
  var cameraSize = game.entities.get(camera, "size");
  game.entities.set(camera, "easing", {
    "size.width": {
      "type": "easeInOutElastic",
      "start": cameraSize.width,
      "end": 400,
      "time": 0,
      "max": 1000
    },
    "size.height": {
      "type": "easeInOutElastic",
      "start": cameraSize.height,
      "end": 225,
      "time": 0,
      "max": 1000
    }
  });

  game.entities.get(entity, "animation").name = "box-anim-f11";
  game.entities.set(entity, "eyes", {
    "blinkSound": "sfx-blink.mp3",
    "speed": 3.5,
    "pupilOffsetX": 0,
    "pupilOffsetY": 0,
    "lidFrame": 0,
    "lidTime": 0
  });
  game.entities.get(entity, "timers").switchToTitle.running = true;
};
