"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context, elapsed) { // eslint-disable-line no-unused-vars
		if (!entity.success && entity.radius >= entity.goalRadius) {
			entity.success = true;
			data.sounds.play("trash-island-success");
		}
	}, ["player"]);
};
