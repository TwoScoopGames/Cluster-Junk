"use strict";

var spawnLightning = require("../spawn-lightning");

module.exports = function(entity, game) {
  var position = game.entities.get(entity, "position");
  var camera = 1;
  var cameraPosition = game.entities.get(camera, "position");
  var x = cameraPosition.x;
  spawnLightning(x, cameraPosition.y, position.x + 50, position.y + 40, game, 0.5);

  game.entities.remove(entity, "scale");
  game.entities.set(entity, "animation", {
    "name": "box-anim-2-f11",
    "time": 0,
    "frame": 0,
    "loop": false,
    "speed": 1
  });
  game.entities.get(entity, "timers").switchAnims.running = true;
  game.entities.get(camera, "follow").distance = 0;
  game.entities.set(camera, "easing", {
    "size.width": {
      "type": "easeOutCubic",
      "start": 1136,
      "end": 400,
      "time": 0,
      "max": 2000
    },
    "size.height": {
      "type": "easeOutCubic",
      "start": 640,
      "end": 225,
      "time": 0,
      "max": 2000
    }
  });
};
