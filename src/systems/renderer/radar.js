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
var lineStartY = radarY - 80;

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(player, context, elapsed) { // eslint-disable-line no-unused-vars

		radarY += simpleEasing(radarY, 5, 0.2);
		var radarImage = data.images.get("radar");
		context.drawImage(radarImage, 5,radarY);
		var period = 5000;
		var radius = 80;
		var angularVelocity = -((Math.PI * 2)/ period);
		var distanceThisFrame = angularVelocity * elapsed;
		angle += distanceThisFrame;
		var x = radius * Math.cos(angle);
		var y = radius * Math.sin(angle);

		lineStartY += simpleEasing(lineStartY, 85, 0.2);
		var linePoints = {
			"startX": 85,
			"startY":lineStartY,
			"endX":85 + x,
			"endY":85 + y
		};
		drawLine(context, linePoints, "1px", "#6abd44");
	}, ["player"]);
};
