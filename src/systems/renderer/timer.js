"use strict";

var simpleEasing = require("../../simpleEasing");

var timerY = -50;
var timerTextY = timerY - 88;

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(player, context) { // eslint-disable-line no-unused-vars
		var goalTimer = player.timers.goalTimer;
		var remainingSeconds = Math.round((goalTimer.max - goalTimer.time)/1000);

		if(remainingSeconds < 10){
			remainingSeconds = "00" + remainingSeconds;
		}else if (remainingSeconds < 100){
			remainingSeconds = "0" + remainingSeconds;
		}


		timerY += simpleEasing(timerY, 5, 0.2);
		context.drawImage(data.images.get("timer"), (data.canvas.width - (data.images.get("timer").width)) -5 , timerY);

		context.fillStyle = "white";
		context.font = "54px blanch";
		timerTextY += simpleEasing(timerTextY, 93, 0.2);
		context.fillText(remainingSeconds, (data.canvas.width - 107), timerTextY);
	}, ["player"]);
};
