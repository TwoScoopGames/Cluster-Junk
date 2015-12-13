"use strict";

module.exports = function(player, data) { // eslint-disable-line no-unused-vars
	if (player.radius >= player.goalRadius) {
		data.sounds.play("trash-island-victory");
	} else {
		data.sounds.play("trash-island-failure");
	}
	// add on screen time's up message with failure/victory
};