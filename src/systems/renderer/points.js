"use strict";

console.log("hello");

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context, elapsed) { // eslint-disable-line no-unused-vars

		// TODO: implement point counter drawing onscreen (every time, not just on this condition)
		if (entity.pointsDisplayQueue.length) {
			console.log("CURRENT POINTS: " + entity.points);
		}

		// TODO: display point additions/reductions (for like a second) near the player on canvas (not console)
		entity.pointsDisplayQueue.forEach(function(pointChange) {
			if (pointChange >= 0) {
				console.log("+" + pointChange);
			} else {
				console.log("-" + Math.abs(pointChange));
			}
		});
		entity.pointsDisplayQueue = [];

	}, ["player"]);
};