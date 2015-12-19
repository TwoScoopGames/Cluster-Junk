"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	data.entities.registerSearch("renderPlayer", ["player", "position", "size", "radius"]);
	ecs.addEach(function(entity, context) { // eslint-disable-line no-unused-vars
		context.strokeStyle = "yellow";
		context.beginPath();

		var position = data.entities.get(entity, "position");
		var size = data.entities.get(size, "position");
		var radius = data.entities.get(size, "radius");

		var cx = position.x + size.width / 2;
		var cy = position.y + size.height / 2;

		context.arc(cx, cy, radius, 0, Math.PI * 2);
		context.stroke();
	}, "renderPlayer");
};
