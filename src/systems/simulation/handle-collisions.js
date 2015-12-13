"use strict";

var onEntityDelete = require("splat-ecs/lib/systems/box-collider").onEntityDelete;

function getCamera(entities) {
	return entities[1];
}

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		if (entity.collisions.length === 0) {
			return;
		}
		var player = data.entities.entities[0];
		entity.collisions.forEach(function(id) {
			var other = data.entities.entities[id];
			if (other.sticky) {
				return;
			}

			data.canvas.width += 50;
			data.canvas.height += 50;

			other.match = {
				id: player.id,
				offsetX: other.position.x - player.position.x,
				offsetY: other.position.y - player.position.y
			};
			other.sticky = true;
			other.velocity = { x: 0, y: 0 };
			onEntityDelete(other, data);
		});
		var camera = getCamera(data.entities.entities);
		camera.size.width = data.canvas.width;
		camera.size.height = data.canvas.height;
	}, ["sticky"]);
};
