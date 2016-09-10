"use strict";

module.exports = function(game) { // eslint-disable-line no-unused-vars
  game.sounds.play("sfx-water-splash.mp3");
  game.sounds.play("ambient-sea-track.mp3", {
    "loopStart": 0,
    "loopEnd": 0
  });
};
