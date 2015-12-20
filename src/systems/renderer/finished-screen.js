"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function renderFinishedScreen(entity, context) { // eslint-disable-line no-unused-vars
		var replayScreen = data.images.get("replay");
		data.context.drawImage(replayScreen, 0, 0);
	}, "title");
};
