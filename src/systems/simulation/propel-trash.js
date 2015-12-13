"use strict";

function closeEnough(positionA, positionB, fudgeFactor) {
	return Math.abs(positionA.x - positionB.x) < fudgeFactor &&
		Math.abs(positionA.y - positionB.y) < fudgeFactor;
}
	
module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var onTarget = closeEnough(entity.position, entity.target, 5);
		var movement2d = entity.movement2d;
		if (onTarget || (entity.sticky && !entity.player)) {
			if (entity.player) {
				movement2d.up = movement2d.down = movement2d.left = movement2d.right = false;
				movement2d.upMax = movement2d.leftMax = -1;
				movement2d.downMax = movement2d.rightMax = 1;
				entity.playerController2d = {
					"up": "up",
					"down": "down",
					"left": "left",
					"right": "right"
				};
				var camera = data.entities.entities[1];
				camera.follow = {
					"id": 0,
					"distance": 200
				};
				data.sounds.play("trash-island-theme", {
					"loopStart": 8.0,
					"loopEnd": 40.0
				});
			} else {
				delete entity.movement2d;
			}
			delete entity.target;
		} else {
			if (entity.position.x > entity.target.x) {
				console.log(entity.name || entity.animation.name, "left");
				movement2d.left = true;
				movement2d.right = false;
			} else if (entity.position.x < entity.target.x) {
				console.log(entity.name || entity.animation.name, "right");
				movement2d.right = true;
				movement2d.left = false;
			}
			if (entity.position.y > entity.target.y) {
				console.log(entity.name || entity.animation.name, "up");
				movement2d.up = true;
				movement2d.down = false;
			} else if (entity.position.y < entity.target.y) {
				console.log(entity.name || entity.animation.name, "down");
				movement2d.down = true;
				movement2d.up = false;
			}
			console.log("endofturn", JSON.stringify(entity));
		}
	}, ["target"]);
};
