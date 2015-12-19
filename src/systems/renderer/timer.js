"use strict";

var easing = require("easing-js");

var timerStart = -50;

var time = 0;
var duration = 500;

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context, elapsed) { // eslint-disable-line no-unused-vars

		//timer image
		var timerY = 5;
		if (time < duration) {
			time += elapsed;
			timerY = easing.easeOutElastic(time, timerStart, 55, duration);
		}
		context.drawImage(data.images.get("timer"), (data.canvas.width - (data.images.get("timer").width)) -5 , timerY);

		// Time text
		if (time >= duration) {
			var goalTimer = data.entities.get(entity, "timers").goalTimer;
			var remainingSeconds = Math.round((goalTimer.max - goalTimer.time) / 1000);

			if (remainingSeconds < 10) {
				remainingSeconds = "00" + remainingSeconds;
			} else if (remainingSeconds < 100) {
				remainingSeconds = "0" + remainingSeconds;
			}
			context.fillStyle = "white";
			context.font = "54px blanch";
			context.fillText(remainingSeconds, (data.canvas.width - 107), 93);
		}
	}, "player");
};
