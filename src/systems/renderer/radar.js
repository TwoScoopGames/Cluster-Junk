"use strict";

var easing = require("easing-js");

//easing
var radarStart = -50;
var time = 0;
var duration = 500;

//radar
var angle = 0;
var period = 5000;
var radius = 80;

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context, elapsed) { // eslint-disable-line no-unused-vars

		//timer image
		var radarY = 5;
		if(time < duration){
			time += elapsed;
			radarY = easing.easeOutElastic(time, radarStart, 55, duration);
		}
		var radarImage = data.images.get("radar");
		context.drawImage(radarImage, 5, radarY);

		// radar screen
		if(time >= duration){

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

			data.entities.find("position").forEach(function(id) {
				var entityType = data.entities.get(id, "type");
				var entitySticky = data.entities.get(id, "sticky");
				var entityPlayer = data.entities.get(id, "player");
				var entityPosition = data.entities.get(id, "position");

				if ((entityType !== "trash" && entityType !== "obstacle") || entitySticky || entityPlayer) {
					return;
				}

				var dx = entityPosition.x - entityPosition.x;
				var dy = entityPosition.y - entityPosition.y;

				var max = 1000 * 1000;
				var dist = Math.max(Math.min((dx * dx + dy * dy), max), -max);
				var scaledDist = dist / max * (radius - 3);

				var angle = Math.atan2(entityPosition.y - entityPosition.y, entityPosition.x - entityPosition.x);

				var ex = scaledDist * Math.cos(angle);
				var ey = scaledDist * Math.sin(angle);

				context.strokeStyle = "#6abd44";
				if (entityType === "obstacle") {
					context.strokeStyle = "red";
				}
				context.beginPath();
				context.arc(cx + ex, cy + ey, 3, 0, Math.PI * 2);
				context.stroke();
			});
		}
	}, ["player"]);
};

function drawLine(context, ray, width, color) {
	context.strokeStyle = color;
	context.lineWidth = width;
	context.beginPath();
	context.moveTo(ray.startX, ray.startY);
	context.lineTo(ray.endX, ray.endY);
	context.stroke();
}
