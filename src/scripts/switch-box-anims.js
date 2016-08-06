"use strict";

module.exports = function(entity, game) {
  var viewport = 0;
  var camera = 1;
  game.entities.get(viewport, "follow").distance = 0;
  game.entities.remove(camera, "matchCanvasSize");
  game.entities.set(camera, "easing", {
    "size.width": {
      "type": "easeInOutElastic",
      "start": 1136,
      "end": 400,
      "time": 0,
      "max": 1000
    },
    "size.height": {
      "type": "easeInOutElastic",
      "start": 640,
      "end": 225,
      "time": 0,
      "max": 1000
    }
  });

  game.entities.get(entity, "animation").name = "box-anim-f11";
  game.entities.set(entity, "eyes", {
    "pupilOffsetX": 0,
    "pupilOffsetY": 0,
    "lidFrame": 0,
    "lidTime": 0
  });
  game.entities.get(entity, "timers").switchToTitle.running = true;
};
