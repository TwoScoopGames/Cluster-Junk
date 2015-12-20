"use strict";

function center(position, size) {
	var x = position.x + (size.width / 2);
	var y = position.y + (size.height / 2);
	return { x: x, y: y };
}

function distanceSquared(aPosition, aSize, bPosition, bSize) {
	var ca = center(aPosition, aSize);
	var cb = center(bPosition, bSize);

	var dx = ca.x - cb.x;
	var dy = ca.y - cb.y;

	return dx * dx + dy * dy;
}

function calculateAspectRatio() {
	var canvas = document.getElementById("canvas");
	var canvasStyle = window.getComputedStyle(canvas);
	var ar = parseInt(canvasStyle.width) / parseInt(canvasStyle.height);
	aspectRatio = ar;
	return ar;
}
var aspectRatio = calculateAspectRatio();
window.onresize = calculateAspectRatio;

function randomFrom(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function makePoints(entities, points) {
	var id = entities.create();

	entities.set(id, "position", {
		x: Math.floor(Math.random() * 380 - 190),
		y: Math.floor(Math.random() * 380 - 190)
	});
	entities.set(id, "pointChange", points);
	entities.set(id, "timers", {
		disappear: {
			running: true,
			time: 0,
			max: 900,
			script: "./scripts/delete-entity"
		}
	});
}

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	function resolveCollisionShortest(a, b, target) {
		var aPosition = data.entities.get(a, "position");
		var aSize = data.entities.get(a, "size");
		var bPosition = data.entities.get(b, "position");
		var bSize = data.entities.get(b, "size");
		if (target === undefined) {
			target = a;
		}
		var targetPosition = data.entities.get(target, "position");
		var targetVelocity = data.entities.get(target, "velocity");

		var bottom = [0, bPosition.y + bSize.height - aPosition.y, 0, 0.5];
		var top = [0, bPosition.y - aSize.height - aPosition.y, 0, -0.5];
		var right = [bPosition.x + bSize.width - aPosition.x, 0, 0.5, 0];
		var left = [bPosition.x - aSize.width - aPosition.x, 0, -0.5, 0];

		var smallest = [bottom, top, right, left].reduce(function(prev, curr) {
			if (Math.abs(curr[0] + curr[1]) < Math.abs(prev[0] + prev[1])) {
				return curr;
			}
			return prev;
		});
		targetPosition.x += smallest[0];
		targetPosition.y += smallest[1];
		targetVelocity.x += smallest[2];
		targetVelocity.y += smallest[3];
	}

	data.entities.registerSearch("handleCollisions", ["sticky", "collisions"]);
	ecs.addEach(function handleCollisions(entity, elapsed) { // eslint-disable-line no-unused-vars
		var player = 0;
		var playerPosition = data.entities.get(player, "position");
		var playerSize = data.entities.get(player, "size");
		var playerRadius = data.entities.get(player, "radius");
		var playerArea = data.entities.get(player, "area");
		var playerPoints = data.entities.get(player, "points");
		var playerTimers = data.entities.get(player, "timers");

		data.entities.get(entity, "collisions").forEach(function(other) {
			if (data.entities.get(other, "sticky")) {
				return;
			}

			var otherNoises = data.entities.get(other, "noises");
			if (otherNoises && !playerTimers.silent.running) {
				data.sounds.play(randomFrom(otherNoises));
				playerTimers.silent.running = true;
			}

			data.entities.set(other, "velocity", { x: 0, y: 0 });

			var otherPosition = data.entities.get(other, "position");
			var otherSize = data.entities.get(other, "size");
			var otherType = data.entities.get(other, "type");

			var distSq = distanceSquared(playerPosition, playerSize, otherPosition, otherSize);
			var otherArea = otherSize.width * otherSize.height;
			if (distSq < playerRadius * playerRadius) {
				playerArea += otherArea;
				var newPoints = Math.ceil(Math.sqrt(otherArea) / 10) * 10;
				playerPoints += newPoints;
				makePoints(data.entities, newPoints);
				data.entities.set(other, "match", {
					id: player,
					offsetX: otherPosition.x - playerPosition.x,
					offsetY: otherPosition.y - playerPosition.y
				});
				data.entities.set(other, "sticky", true);
				data.sounds.play("sfx-power-up");
				var notice = 2;
				data.entities.set(notice, "message", data.entities.get(other, "name"));
			} else if (otherType === "obstacle") {
				resolveCollisionShortest(entity, other, player);
				if (!data.entities.get(player, "recovering")) {
					var pointDeduction = -1 * Math.min(Math.floor(Math.sqrt(otherArea) / 10), playerPoints);
					if (pointDeduction) {
						playerPoints += pointDeduction;
						makePoints(data.entities, pointDeduction);
						data.entities.set(player, "recovering", true);
						playerTimers.recoveryTimer.running = true;
					}
				}
			} else {
				resolveCollisionShortest(other, entity);
			}
		});
		playerRadius = Math.sqrt(playerArea / Math.PI * 2);
		data.entities.set(player, "radius", playerRadius);
		data.entities.set(player, "area", playerArea);
		data.entities.set(player, "points", playerPoints);

		var size = 600;
		var viewportSize = Math.floor(playerRadius * 2 * 3);
		data.entities.set(player, "scale", size / viewportSize);

		data.canvas.height = size;
		data.canvas.width = data.canvas.height * aspectRatio;

		var camera = 1;
		var cameraSize = data.entities.get(camera, "size");
		cameraSize.height = Math.floor(playerRadius * 2 * 3);
		cameraSize.width = cameraSize.height * aspectRatio;
	}, "handleCollisions");
};
