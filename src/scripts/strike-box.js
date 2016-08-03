"use strict";

var spawnLightning = require("../spawn-lightning");

module.exports = function(entity, game) {
  var position = game.entities.get(entity, "position");
  var viewport = 0;
  var viewportPosition = game.entities.get(viewport, "position");
  var viewportSize = game.entities.get(viewport, "size");
  var x = viewportPosition.x + viewportSize.width;
  spawnLightning(x, viewportPosition.y, position.x + 50, position.y + 40, game, 0.5);
  game.sounds.play("sfx-lightning-1.mp3");

  game.entities.remove(entity, "onPositionLeftOf");
  game.entities.get(entity, "timers").moveBoxIntoWater.running = true;
};
