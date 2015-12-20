"use strict";

function closeEnough(positionA, positionB, fudgeFactor) {
	return Math.abs(positionA.x - positionB.x) < fudgeFactor &&
		Math.abs(positionA.y - positionB.y) < fudgeFactor;
}

var playerId = 0;
var cameraId = 1;

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function propelTrash(entity, elapsed) { // eslint-disable-line no-unused-vars
		var movement2d = data.entities.get(entity, "movement2d");
		movement2d.up = false;
		movement2d.down = false;
		movement2d.left = false;
		movement2d.right = false;

		var radius = data.entities.get(playerId, "radius");
		var isPlayer = data.entities.get(entity, "player");
		var fudgeFactor = isPlayer ? 5 : radius - 50;

		var position = data.entities.get(entity, "position");
		var target = data.entities.get(entity, "target");

		if (closeEnough(position, target, fudgeFactor)) {
			if (isPlayer) {
				// only proceed if player is the last entity with a target
				var entitiesWithTarget = data.entities.find("target");
				if (entitiesWithTarget.length > 1) {
					for (var i = 0; i < entitiesWithTarget.length; i++) {
						if (!data.entities.get(entitiesWithTarget[i], "sticky")) {
							return;
						}
					}
				}
				movement2d.upMax = movement2d.leftMax = -1;
				movement2d.downMax = movement2d.rightMax = 1;
				data.entities.set(entity, "eyes", true);

				var canvas = data.canvas;
				data.entities.set(cameraId, "follow", {
					"id": 0,
					"distance": Math.min(200, Math.min(canvas.height / 5, canvas.width / 5))
				});
				data.sounds.play("trash-island-theme", {
					"loopStart": 8.0,
					"loopEnd": 40.0
				});
				data.entities.remove(entity, "target");
			} else {
				data.entities.remove(entity, "movement2d");
				data.entities.remove(entity, "target");
			}
		} else {
			if (position.x > target.x) {
				movement2d.left = true;
				movement2d.right = false;
			} else if (position.x < target.x) {
				movement2d.right = true;
				movement2d.left = false;
			}
			if (position.y > target.y) {
				movement2d.up = true;
				movement2d.down = false;
			} else if (position.y < target.y) {
				movement2d.down = true;
				movement2d.up = false;
			}
		}
	}, "target");
};
