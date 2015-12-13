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

		Object.keys(data.entities.entities).forEach(function(id) {
			var entity = data.entities.entities[id];
			if (entity.type !== "trash" || entity.sticky || entity.player) {
				return;
			}

			var dx = entity.position.x - player.position.x;
			var dy = entity.position.y - player.position.y;

			var max = 1000 * 1000;
			var dist = Math.max(Math.min((dx * dx + dy * dy), max), -max);
			var scaledDist = dist / max * (radius - 3);

			var angle = Math.atan2(entity.position.y - player.position.y, entity.position.x - player.position.x);

			var ex = scaledDist * Math.cos(angle);
			var ey = scaledDist * Math.sin(angle);

			context.strokeStyle = "#6abd44";
			context.beginPath();
			context.arc(cx + ex, cy + ey, 3, 0, Math.PI * 2);
			context.stroke();
		});
	}, ["player"]);
};
