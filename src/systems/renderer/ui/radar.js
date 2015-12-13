"use strict";

function drawLine(context, ray, width, color) {
	context.strokeStyle = color;
	context.lineWidth = width;
	context.beginPath();
	context.moveTo(ray.startX, ray.startY);
	context.lineTo(ray.endX, ray.endY);
	context.stroke();
}
var angle = 0;

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(player, context, elapsed) { // eslint-disable-line no-unused-vars
		var radarImage = data.images.get("radar");
		context.drawImage(radarImage, 5, 5);
		var period = 5000;
		var radius = 80;
		var angularVelocity = -((Math.PI * 2)/ period);
		var distanceThisFrame = angularVelocity * elapsed;
		angle += distanceThisFrame;
		var x = radius * Math.cos(angle);
		var y = radius * Math.sin(angle);

		var linePoints = {
			"startX": 85,
			"startY":85,
			"endX":85 + x,
			"endY":85 + y
		};
		drawLine(context, linePoints, "1px", "#6abd44");
	}, ["player"]);
};
