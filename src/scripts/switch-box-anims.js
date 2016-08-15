"use strict";

module.exports = function(entity, game) {
  var viewport = 0;
  var camera = 1;
  game.entities.getComponent(viewport, "follow").distance = 0;
  game.entities.removeComponent(camera, "matchCanvasSize");
  var cameraSize = game.entities.getComponent(camera, "size");
  var easing = game.entities.addComponent(camera, "easing");
  easing["size.width"] = {
    "type": "easeInOutElastic",
    "start": cameraSize.width,
    "end": 400,
    "time": 0,
    "max": 1000
  };
  easing["size.height"] = {
    "type": "easeInOutElastic",
    "start": cameraSize.height,
    "end": 225,
    "time": 0,
    "max": 1000
  };

  game.entities.getComponent(entity, "animation").name = "box-anim-f11";
  game.entities.getComponent(entity, "timers").addEyes.running = true;
};
