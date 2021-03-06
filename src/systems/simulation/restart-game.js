"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function restartGame(entity, elapsed) { // eslint-disable-line no-unused-vars
    game.sounds.play("ambient-sea-track.mp3", {
      "loopStart": 0,
      "loopEnd": 0
    });
    if (game.inputs.buttonPressed("action")) {
      game.switchScene("title");
    }
  }, "title");
};
