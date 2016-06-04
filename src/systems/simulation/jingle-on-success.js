"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function jingleOnSuccess(entity, context, elapsed) { // eslint-disable-line no-unused-vars
    if (!game.entities.get(entity, "success") && game.entities.get(entity, "radius") >= game.entities.get(entity, "goalRadius")) {
      game.entities.set(entity, "success", true);
      game.sounds.play("trash-island-success.mp3");
    }
  }, "player");
};
