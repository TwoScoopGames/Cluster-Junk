"use strict";

var simpleEasing = require("../../simpleEasing");

function drawLine(context, ray, width, color) {
	context.strokeStyle = color;
	context.lineWidth = width;
	context.beginPath();
	context.moveTo(ray.startX, ray.startY);
	context.lineTo(ray.endX, ray.endY);
	context.stroke();
}

var angle = 0;

var radarY = -50;

var period = 5000;
var radius = 80;

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(player, context, elapsed) { // eslint-disable-line no-unused-vars

		radarY += simpleEasing(radarY, 5, 0.2);

		var radarImage = data.images.get("radar");
		context.drawImage(radarImage, 5, radarY);

		var angularVelocity = -((Math.PI * 2) / period);
		var distanceThisFrame = angularVelocity * elapsed;
		angle += distanceThisFrame;

		var cx = 5 + Math.floor(radarImage.width / 2);
		var cy = radarY + Math.floor(radarImage.height / 2);
		var x = radius * Math.cos(angle);
		var y = radius * Math.sin(angle);

		var linePoints = {
			"startX": cx,
			"startY": cy,
			"endX": cx + x,
			"endY": cy + y
		};
		drawLine(context, linePoints, "1px", "#6abd44");
	}, ["player"]);
};
