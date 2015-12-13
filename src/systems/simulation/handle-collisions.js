"use strict";

var onEntityDelete = require("splat-ecs/lib/systems/box-collider").onEntityDelete;

// function getCamera(entities) {
// 	return entities[1];
// }

function resolveCollisionShortest(player, entity) {
	var bottom = [0, entity.position.y + entity.size.height - player.position.y, 0, 0.5];
	var top = [0, entity.position.y - player.size.height - player.position.y, 0, -0.5];
	var right = [entity.position.x + entity.size.width - player.position.x, 0, 0.5, 0];
	var left = [entity.position.x - player.size.width - player.position.x, 0, -0.5, 0];

	var smallest = [bottom, top, right, left].reduce(function(prev, curr) {
		if (Math.abs(curr[0] + curr[1]) < Math.abs(prev[0] + prev[1])) {
			return curr;
		}
		return prev;
	});
	player.position.x += smallest[0];
	player.position.y += smallest[1];
	player.velocity.x += smallest[2];
	player.velocity.y += smallest[3];
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

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var player = data.entities.entities[0];
		entity.collisions.forEach(function(id) {
			var other = data.entities.entities[id];
			if (other.sticky) {
				return;
			}

			// data.canvas.width += 50;
			// data.canvas.height += 50;

			other.velocity = { x: 0, y: 0 };
			onEntityDelete(other, data);

			var distSq = distanceSquared(player, other);
			if (distSq < player.radius * player.radius) {
				player.area += other.size.width * other.size.height;
				other.match = {
					id: player.id,
					offsetX: other.position.x - player.position.x,
					offsetY: other.position.y - player.position.y
				};
				other.sticky = true;
			} else {
				resolveCollisionShortest(other, entity);
			}
		});
		player.radius = Math.sqrt(player.area / Math.PI * 2);
		// var camera = getCamera(data.entities.entities);
		// camera.size.width = data.canvas.width;
		// camera.size.height = data.canvas.height;
	}, ["sticky"]);
};
