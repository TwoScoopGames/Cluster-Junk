"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function jingleOnSuccess(entity, context, elapsed) { // eslint-disable-line no-unused-vars
    if (!game.entities.getComponent(entity, "success") && game.entities.getComponent(entity, "radius") >= game.entities.getComponent(entity, "goalRadius")) {
      game.entities.setComponent(entity, "success", true);
      game.sounds.play("trash-island-success.mp3");
    }
  }, "player");
};
