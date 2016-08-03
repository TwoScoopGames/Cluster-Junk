"use strict";

var spawnLightning = require("../spawn-lightning");

module.exports = function(entity, game) {
  var position = game.entities.get(entity, "position");
  var viewport = 0;
  var camera = 1;
  var cameraPosition = game.entities.get(camera, "position");
  spawnLightning(cameraPosition.x, cameraPosition.y, position.x + 50, position.y, game, 0.5);
  game.sounds.play("sfx-lightning-2.mp3");

  game.entities.remove(entity, "scale");
  game.entities.set(entity, "animation", {
    "name": "box-anim-2-f11",
    "time": 0,
    "frame": 0,
    "loop": false,
    "speed": 1
  });
  game.entities.get(entity, "timers").switchAnims.running = true;
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
};
