"use strict";

var spawnLightning = require("../spawn-lightning");

module.exports = function(entity, game) {
  var position = game.entities.getComponent(entity, "position");
  var viewport = 0;
  var viewportPosition = game.entities.getComponent(viewport, "position");
  var viewportSize = game.entities.getComponent(viewport, "size");
  var x = viewportPosition.x + viewportSize.width;
  spawnLightning(x, viewportPosition.y, position.x + 50, position.y + 40, game, 0.5);
  game.sounds.play("sfx-lightning-1.mp3");

  game.entities.removeComponent(entity, "onPositionLeftOf");
  game.entities.getComponent(entity, "timers").moveBoxIntoWater.running = true;
};
