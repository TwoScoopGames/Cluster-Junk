"use strict";

function closeEnough(positionA, positionB, fudgeFactor) {
	return Math.abs(positionA.x - positionB.x) < fudgeFactor &&
		Math.abs(positionA.y - positionB.y) < fudgeFactor;
}
	
module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	var missionAccomplished = false;
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var movement2d = entity.movement2d;
		if (closeEnough(entity.position, entity.target, 5) && entity.player) {
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
			missionAccomplished = true;
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
	if (missionAccomplished) {
		ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
			if (entity.target) {
				delete entity.target;
			}
			var movement2d = entity.movement2d;
			movement2d.up = movement2d.down = movement2d.left = movement2d.right = false;
		}, ["target"]);
	}
};
