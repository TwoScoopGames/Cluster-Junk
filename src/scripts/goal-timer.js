"use strict";

module.exports = function(entity, data) { // eslint-disable-line no-unused-vars
  data.sounds.stop("trash-island-theme.mp3");
  data.sounds.stop("trash-island-bossa.mp3");
  data.entities.set(entity, "gameOver", true);
  data.entities.remove(entity, "playerController2d");
  var movement2d = data.entities.get(entity, "movement2d");
  movement2d.up = false;
  movement2d.down = false;
  movement2d.left = false;
  movement2d.right = false;
  data.entities.get(entity, "timers").endOfGameTimer.running = true;
};
