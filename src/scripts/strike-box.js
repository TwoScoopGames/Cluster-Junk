"use strict";

var spawnLightning = require("../spawn-lightning");

var lastLeft = false;
module.exports = function(entity, game) {
  var position = game.entities.get(entity, "position");
  var viewport = 0;
  var viewportPosition = game.entities.get(viewport, "position");
  var viewportSize = game.entities.get(viewport, "size");
  var x = lastLeft ? viewportPosition.x : viewportPosition.x + viewportSize.width;
  lastLeft = !lastLeft;
  spawnLightning(x, viewportPosition.y, position.x + 50, position.y + 40, game, 0.5);
  game.sounds.play(lastLeft ? "sfx-lightning-1.mp3" : "sfx-lightning-2.mp3");

  game.entities.remove(entity, "onPositionLeftOf");
  if (position.x < 500) {
    game.entities.set(viewport, "follow", {
      "id": entity,
      "distance": 200
    });
    game.entities.set(entity, "moveToPoint", {
      "x": 1500,
      "y": 1550,
      "maxDistanceAway": 10,
      "script": "./scripts/strike-and-transform-box"
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
