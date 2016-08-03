"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function startGame(entity, elapsed) { // eslint-disable-line no-unused-vars
    if (game.inputs.buttonPressed("action")) {
      game.switchScene("level");
    }
  }, "title");
};
