"use strict";

function closeEnough(positionA, positionB, fudgeFactor) {
	return Math.abs(positionA.x - positionB.x) < fudgeFactor &&
		Math.abs(positionA.y - positionB.y) < fudgeFactor;
}
	
module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	var entitiesWithTarget = [];
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		if (entitiesWithTarget.indexOf(entity) === -1) {
			entitiesWithTarget.push(entity);
		}
		var movement2d = entity.movement2d;
		movement2d.up = false;
		movement2d.down = false;
		movement2d.left = false;
		movement2d.right = false;

		var fudgeFactor = entity.player ? 5 : data.entities.entities[0].radius - 50;
		if (closeEnough(entity.position, entity.target, fudgeFactor)) {
			if (entity.player) {
				// only proceed if player is the last entity with a target
				if (entitiesWithTarget.length > 1) {
					for (var i = 0; i < entitiesWithTarget.length; i++) {
						if (!entitiesWithTarget[i].sticky) {
							return;
						}
					}
				}
				movement2d.upMax = movement2d.leftMax = -1;
				movement2d.downMax = movement2d.rightMax = 1;
				entity.eyes = true;
				var camera = data.entities.entities[1];
				camera.follow = {
					"id": 0,
					"distance": 200
				};
				data.sounds.play("trash-island-theme", {
					"loopStart": 8.0,
					"loopEnd": 40.0
				});
				delete entity.target;
			} else {
				delete entity.movement2d;
				delete entity.target;
				entitiesWithTarget.splice(entitiesWithTarget.indexOf(entity), 1);
			}
		} else {
			if (entity.position.x > entity.target.x) {
				movement2d.left = true;
				movement2d.right = false;
			} else if (entity.position.x < entity.target.x) {
				movement2d.right = true;
				movement2d.left = false;
			}
			if (entity.position.y > entity.target.y) {
				movement2d.up = true;
				movement2d.down = false;
			} else if (entity.position.y < entity.target.y) {
				movement2d.down = true;
				movement2d.up = false;
			}
		}
	}, ["target"]);
};
