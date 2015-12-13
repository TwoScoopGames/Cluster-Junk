"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(player, context) { // eslint-disable-line no-unused-vars
		var goalTimer = player.timers.goalTimer;
		var remainingSeconds = Math.round((goalTimer.max - goalTimer.time)/1000);
		if (remainingSeconds < 100){
			remainingSeconds = "0" + remainingSeconds;
		}else if(remainingSeconds < 10){
			remainingSeconds = "00" + remainingSeconds;
		}
		context.drawImage(data.images.get("timer"), 970, 5);

		context.fillStyle = "white";
		context.font = "54px blanch";
		context.fillText(remainingSeconds, 1020, 93);
	}, ["player"]);
};
