"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(player, context) { // eslint-disable-line no-unused-vars
		context.drawImage(data.images.get("radar"), 5, 5);
	}, ["player"]);
};
