"use strict";

var Gamepad = require("html5-gamepad");

module.exports = function(ecs, data) {// eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var gamepad = new Gamepad();
		gamepad.update();

		var velocity = data.entities.get(entity, "velocity");

		velocity.x = gamepad.axis(0, "left stick x");
		velocity.y = gamepad.axis(0, "left stick y");

	}, "movement2d");
};
