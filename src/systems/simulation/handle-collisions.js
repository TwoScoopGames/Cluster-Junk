"use strict";

var onEntityDelete = require("splat-ecs/lib/systems/box-collider").onEntityDelete;

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		if (entity.collisions.length === 0) {
			return;
		}
		entity.collisions.forEach(function(id) {
			var other = data.entities.entities[id];
			if (other.sticky) {
				return;
			}

			other.match = {
				id: entity.id,
				offsetX: other.position.x - entity.position.x,
				offsetY: other.position.y - entity.position.y
			};
			other.sticky = true;
			other.velocity = { x: 0, y: 0 };
			onEntityDelete(other, data);
		});
	}, ["sticky"]);
};
