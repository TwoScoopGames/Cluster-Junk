"use strict";

var fallingEdge = require("../../falling-edge");

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	var actionPressed = fallingEdge(data.input.button.bind(data.input, "action"));

	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		data.sounds.play("ambient-sea-track", {
			"loopStart": 0,
			"loopEnd": 0
		});
		if (actionPressed()) {
			data.switchScene("title");
		}
	}, "title");
};
