"use strict";

module.exports = function(entity, data) { // eslint-disable-line no-unused-vars
	var radius = data.entities.get(entity, "radius");
	var goalRadius = data.entities.get(entity, "goalRadius");
	if (radius >= goalRadius) {
		data.sounds.play("trash-island-victory");
	} else {
		data.sounds.play("trash-island-failure");
	}
	// add on screen time's up message with failure/victory
};
