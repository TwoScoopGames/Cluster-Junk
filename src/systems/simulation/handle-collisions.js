"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(player, elapsed) { // eslint-disable-line no-unused-vars
		if (player.collisions.length === 0) {
			return;
		}
		// console.log(player.collisions);
	}, ["player"]);
};
