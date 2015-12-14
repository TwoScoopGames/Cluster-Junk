"use strict";

var onEntityDelete = require("splat-ecs/lib/systems/box-collider").onEntityDelete;

function getCamera(entities) {
	return entities[1];
}

function resolveCollisionShortest(a, b, target) {
	var bottom = [0, b.position.y + b.size.height - a.position.y, 0, 0.5];
	var top = [0, b.position.y - a.size.height - a.position.y, 0, -0.5];
	var right = [b.position.x + b.size.width - a.position.x, 0, 0.5, 0];
	var left = [b.position.x - a.size.width - a.position.x, 0, -0.5, 0];

	var smallest = [bottom, top, right, left].reduce(function(prev, curr) {
		if (Math.abs(curr[0] + curr[1]) < Math.abs(prev[0] + prev[1])) {
			return curr;
		}
		return prev;
	});
	target = target || a;
	target.position.x += smallest[0];
	target.position.y += smallest[1];
	target.velocity.x += smallest[2];
	target.velocity.y += smallest[3];
}

function center(entity) {
	var x = entity.position.x + (entity.size.width / 2);
	var y = entity.position.y + (entity.size.height / 2);
	return { x: x, y: y };
}

function distanceSquared(a, b) {
	var ca = center(a);
	var cb = center(b);

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

function randomFrom(array){
	return array[Math.floor(Math.random() * array.length)];
}

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var player = data.entities.entities[0];
		entity.collisions.forEach(function(id) {
			var other = data.entities.entities[id];
			if (other.sticky) {
				return;
			}

			if (other.noises && !other.silent) {
				data.sounds.play(randomFrom(other.noises));
				other.silent = true;
				setTimeout(function () {
					other.silent = false;
				}, 800);
			}

			other.velocity = { x: 0, y: 0 };
			onEntityDelete(other, data);

			var distSq = distanceSquared(player, other);
			var otherArea = other.size.width * other.size.height;
			if (distSq < player.radius * player.radius) {
				player.area += otherArea;
				var newPoints = Math.ceil(Math.sqrt(otherArea) / 10) * 10;
				player.points += newPoints;
				player.pointsDisplayQueue.push(newPoints);
				other.match = {
					id: player.id,
					offsetX: other.position.x - player.position.x,
					offsetY: other.position.y - player.position.y
				};
				other.sticky = true;
				data.sounds.play("sfx-power-up");
				var message = other.name;
				var notice = data.entities.entities[2];
				notice.message = message;
			} else if (other.type === "obstacle") {
				resolveCollisionShortest(entity, other, player);
				var pointDeduction = -1 * Math.min(Math.floor(Math.sqrt(otherArea) / 10), player.points);
				if (pointDeduction) {
					player.points += pointDeduction;
					player.pointsDisplayQueue.push(pointDeduction);
				}
			} else {
				resolveCollisionShortest(other, entity);
			}
		});
		player.radius = Math.sqrt(player.area / Math.PI * 2);

		var size = 600;
		var viewportSize = Math.floor(player.radius * 2 * 3);
		player.scale = size / viewportSize;

		data.canvas.height = size;
		data.canvas.width = data.canvas.height * aspectRatio;

		var camera = getCamera(data.entities.entities);
		camera.size.height = Math.floor(player.radius * 2 * 3);
		camera.size.width = camera.size.height * aspectRatio;
	}, ["sticky"]);
};
