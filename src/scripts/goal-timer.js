"use strict";

var tracksToStop = [
  "trash-island-theme.mp3",
  "trash-island-theme-2x.mp3",
  "trash-island-bossa.mp3",
  "trash-island-bossa-2x.mp3"
];

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars
  tracksToStop.forEach(function(track) {
    game.sounds.stop(track);
  });
  game.sounds.play("sfx-fog-horn.mp3");
  game.entities.setComponent(entity, "gameOver", true);
  game.entities.removeComponent(entity, "playerController2d");
  var movement2d = game.entities.getComponent(entity, "movement2d");
  movement2d.up = false;
  movement2d.down = false;
  movement2d.left = false;
  movement2d.right = false;
  game.entities.getComponent(entity, "timers").endOfGameTimer.running = true;
};
