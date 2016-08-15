"use strict";

var spawnLightning = require("../spawn-lightning");

module.exports = function(entity, game) {
  var position = game.entities.getComponent(entity, "position");
  var camera = 1;
  var cameraPosition = game.entities.getComponent(camera, "position");
  spawnLightning(cameraPosition.x, cameraPosition.y, position.x + 50, position.y, game, 0.5);
  game.sounds.play("sfx-lightning-2.mp3");

  game.entities.removeComponent(entity, "scale");
  var animation = game.entities.addComponent(entity, "animation");
  animation.name = "box-anim-2-f11";
  animation.loop = false;
  game.entities.getComponent(entity, "timers").switchAnims.running = true;
};
