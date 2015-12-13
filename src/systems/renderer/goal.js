"use strict";

var cx = 100;
var cy = 300;
var radius = 50;

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context, elapsed) { // eslint-disable-line no-unused-vars

		var progressRadius = (entity.radius / entity.goalRadius) * radius;

		context.fillStyle = "rgba(106, 189, 68, 0.55)";
		context.beginPath();
		context.arc(cx, cy, progressRadius, 0, Math.PI * 2);
		context.fill();

		context.strokeStyle = "rgba(228, 227, 158, 0.48)";
		context.beginPath();
		context.arc(cx, cy, radius, 0, Math.PI * 2);
		context.stroke();

	}, ["player"]);
};
