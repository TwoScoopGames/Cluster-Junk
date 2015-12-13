"use strict";

var cx = 100;
var cy = 300;
var radius = 50;

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context, elapsed) { // eslint-disable-line no-unused-vars

		var progressRadius = (entity.radius / entity.goalRadius) * radius;

		context.fillStyle = "green";
		context.beginPath();
		context.arc(cx, cy, progressRadius, 0, Math.PI * 2);
		context.fill();

		context.strokeStyle = "yellow";
		context.beginPath();
		context.arc(cx, cy, radius, 0, Math.PI * 2);
		context.stroke();

	}, ["player"]);
};
