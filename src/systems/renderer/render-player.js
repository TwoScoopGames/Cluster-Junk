"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context) { // eslint-disable-line no-unused-vars
		context.strokeStyle = "yellow";
		context.beginPath();
		var cx = entity.position.x + entity.size.width / 2;
		var cy = entity.position.y + entity.size.height / 2;
		context.arc(cx, cy, entity.radius, 0, Math.PI * 2);
		context.stroke();
	}, ["player", "position", "size", "radius"]);
};
