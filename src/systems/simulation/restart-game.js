"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	ecs.addEach(function restartGame(entity, elapsed) { // eslint-disable-line no-unused-vars
		game.sounds.play("ambient-sea-track", {
			"loopStart": 0,
			"loopEnd": 0
		});
		if (game.input.buttonReleased("action")) {
			game.switchScene("title");
		}
	}, "title");
};
