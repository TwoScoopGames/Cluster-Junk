"use strict";

var spawnLightning = require("../spawn-lightning");

var lastLeft = false;
module.exports = function(entity, game) {
  var position = game.entities.get(entity, "position");
  var size = game.entities.get(1, "size");
  var x = lastLeft ? 0 : size.width;
  lastLeft = !lastLeft;
  spawnLightning(x, 0, position.x + 50, position.y + 150, game, 0.5);
  game.entities.remove(entity, "onPositionLeftOf");
  if (position.x < 500) {
    game.entities.set(1, "follow", {
      "id": entity,
      "distance": 200
    });
    game.entities.set(entity, "easing", {
      "position.y": {
        "type": "easeOutElastic",
        "start": position.y,
        "end": position.y + 500,
        "time": 0,
        "max": 2000
      }
    });
    game.entities.remove(entity, "match");
  } else {
    game.entities.set(entity, "onPositionLeftOf", { x: position.x - 100, script: "./scripts/strike-box" });
  }
};
