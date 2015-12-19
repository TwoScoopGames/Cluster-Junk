"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context, elapsed) { // eslint-disable-line no-unused-vars
		if (!data.entities.get(entity, "success") && data.entities.get(entity, "radius") >= data.entities.get(entity, "goalRadius")) {
			data.entities.set(entity, "success", true);
			data.sounds.play("trash-island-success");
		}
	}, "player");
};
