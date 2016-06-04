"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function startGame(entity, elapsed) { // eslint-disable-line no-unused-vars
    game.sounds.play("ambient-sea-track.mp3", {
      "loopStart": 0,
      "loopEnd": 0
    });
    if (game.inputs.buttonReleased("action")) {
      game.switchScene("main");
    }
  }, "title");
};
