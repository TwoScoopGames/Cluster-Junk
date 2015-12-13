"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(title, context) { // eslint-disable-line no-unused-vars
		var titleScreen = data.images.get("titleScreen");
		data.context.drawImage(titleScreen, 0,0);

	}, ["title"]);
};
