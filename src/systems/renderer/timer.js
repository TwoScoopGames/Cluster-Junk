"use strict";

var simpleEasing = require("../../simpleEasing");

var timerY = -50;
var timerTextY = timerY - 88;

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(player, context) { // eslint-disable-line no-unused-vars
		var goalTimer = player.timers.goalTimer;
		var remainingSeconds = Math.round((goalTimer.max - goalTimer.time)/1000);
		if (remainingSeconds < 100){
			remainingSeconds = "0" + remainingSeconds;
		}else if(remainingSeconds < 10){
			remainingSeconds = "00" + remainingSeconds;
		}

		timerY += simpleEasing(timerY, 5, 0.2);
		context.drawImage(data.images.get("timer"), 970, timerY);

		context.fillStyle = "white";
		context.font = "54px blanch";
		timerTextY += simpleEasing(timerTextY, 93, 0.2);
		context.fillText(remainingSeconds, 1020, timerTextY);
	}, ["player"]);
};
