"use strict";

var spawnLightning = require("../spawn-lightning");

var lastLeft = false;
module.exports = function(entity, game) {
  var position = game.entities.get(entity, "position");
  var camera = 1;
  var cameraPosition = game.entities.get(camera, "position");
  var cameraSize = game.entities.get(camera, "size");
  var x = lastLeft ? cameraPosition.x : cameraPosition.x + cameraSize.width;
  lastLeft = !lastLeft;
  spawnLightning(x, cameraPosition.y, position.x + 50, position.y + 40, game, 0.5);
  game.entities.remove(entity, "onPositionLeftOf");
  if (position.x < 500) {
    game.entities.set(camera, "follow", {
      "id": entity,
      "distance": 200
    });
    game.entities.set(entity, "velocity", {
      "x": 0.1,
      "y": 0.1,
      "z": 0
    });
    game.entities.set(entity, "easing", {
      "scale.scale": {
        "type": "easeOutCubic",
        "start": 2.0,
        "end": 1.0,
        "time": 0,
        "max": 500
      },
      "position.x": {
        "type": "easeOutQuart",
        "start": position.x,
        "end": position.x + 500,
        "time": 0,
        "max": 3000
      },
      "position.y": {
        "type": "easeOutElastic",
        "start": position.y,
        "end": position.y + 500,
        "time": 0,
        "max": 3000
      }
    });
    game.entities.remove(entity, "match");
  } else {
    game.entities.set(entity, "onPositionLeftOf", { x: position.x - 100, script: "./scripts/strike-box" });
  }
};
