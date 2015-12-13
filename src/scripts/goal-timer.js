"use strict";

module.exports = function(player, data) { // eslint-disable-line no-unused-vars
	data.sounds.stop("trash-island-theme");
	player.gameOver = true;
	delete player.playerController2d;
	player.movement2d.up = false;
	player.movement2d.down = false;
	player.movement2d.left = false;
	player.movement2d.right = false;
	player.timers.endOfGameTimer.running = true;
};
