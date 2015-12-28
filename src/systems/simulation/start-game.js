"use strict";

var fallingEdge = require("../../falling-edge");

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	var actionPressed = fallingEdge(game.input.button.bind(game.input, "action"));

	ecs.addEach(function startGame(entity, elapsed) { // eslint-disable-line no-unused-vars
		game.sounds.play("ambient-sea-track", {
			"loopStart": 0,
			"loopEnd": 0
		});
		if (actionPressed()) {
			game.switchScene("main");
		}
	}, "title");
};
