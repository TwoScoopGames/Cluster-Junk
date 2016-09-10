"use strict";

module.exports = function(game) { // eslint-disable-line no-unused-vars
  game.scaleCanvasToFitRectangle(1136, 640);
  game.sounds.play("trash-island-thunderstorm.mp3", {
    "loopStart": 0,
    "loopEnd": 0
  });
  game.sounds.play("trash-island-storm-intro-a.mp3", {
    "loopStart": 11.7,
    "loopEnd": 11.701
  });
};
