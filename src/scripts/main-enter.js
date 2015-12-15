"use strict";

var prefabs = require("../data/prefabs");
var objectValues = require("../objectValues");
var resetCollisions = require("splat-ecs/lib/systems/box-collider").reset;

function clone(obj) {
	return JSON.parse(JSON.stringify(obj)); // gross
}

function makePrefab(prefab, entities) {
	var e = entities.add();
	var copy = clone(prefab);
	copy.id = e.id;
	entities.entities[copy.id] = copy;
	return copy;
}

function shrinkBoundingBox(entity, pct) {
	var xl = Math.floor(entity.size.width * pct);
	var yl = Math.floor(entity.size.height * pct);
	entity.size.width -= xl;
	entity.size.height -= yl;
	entity.image.destinationX -= Math.floor(xl / 2);
	entity.image.destinationY -= Math.floor(yl / 2);
}

function spawnRandomly(entities, type, deadZone) {
	var prefabsOfType = objectValues(prefabs).filter(function(prefab){
		return prefab.type === type;
	});
	var entity = makePrefab(randomFrom(prefabsOfType), entities);

	var randomPoint = randomInRect(-4000, -4000, 8000, 8000, deadZone);
	entity.position.x = randomPoint.x;
	entity.position.y = randomPoint.y;
	shrinkBoundingBox(entity, 0.4);
	entity.rotation = {
		"angle": entity.type === "obstacle" ? 0 : randomInRange((Math.PI / -3), (Math.PI / 3)),
		"x": entity.size.width/ 2,
		"y": entity.size.height/ 2
	};
}

function randomInRange(min, max) {
	return min + Math.random() * (max - min);
}

function randomInRect(x, y, width, height, deadZone) {
	var point = {
		"x": randomInRange(x, x + width),
		"y": randomInRange(y, y + height)
	};
	if (deadZone) {
		while (inDeadZone(point, deadZone)) {
			point = {
				"x": randomInRange(x, x + width),
				"y": randomInRange(y, y + height)
			};
		}
	}
	return point;
}

function inDeadZone(point, deadZone) {
	var inInnerZone = point.x >= deadZone.x &&
		point.x < deadZone.x + deadZone.width &&
		point.y >= deadZone.y &&
		point.y < deadZone.y + deadZone.height;
	if (inInnerZone) {
		return true;
	}
	if (!deadZone.plusShaped) {
		return false;
	}
	var inPlusZone =
		(point.x >= deadZone.x && point.x < deadZone.x + deadZone.width &&
			point.y >= deadZone.outerY && point.y < deadZone.outerY + deadZone.outerHeight) ||
		(point.x >= deadZone.outerX && point.x < deadZone.outerX + deadZone.outerWidth &&
			point.y >= deadZone.y && point.y < deadZone.y + deadZone.height);
	if (inPlusZone) {
		return true;
	}
	return false;
}

function randomFrom(array){
	return array[Math.floor(Math.random() * array.length)];
}

var levels = require("../data/levels.json");

module.exports = function(data) { // eslint-disable-line no-unused-vars
	data.sounds.play("ambient-sea-track", {
		"loopStart": 0,
		"loopEnd": 0
	});

	resetCollisions();

	var player = window.player = data.entities.entities[0];
	var center = {
		"x": player.position.x,
		"y": player.position.y + 300 - player.size.height / 2
	};

	var camera = data.entities.entities[1];
	camera.position.x = -window.innerWidth / 4 + player.size.width / 2;

	var level = data.arguments.level || 0;
	player.radius = levels[level].radius;
	player.goalRadius = levels[level].goalRadius;
	player.timers.goalTimer.max = levels[level].maxTime * 1000;
	data.entities.entities[2].message = levels[level].message;

	var trashDeadZone = {
		"x": player.size.width / 2 - 300,
		"y": player.size.height / 2 - 200,
		"width": 600,
		"height": 400,
		"plusShaped": true,
		"outerX": player.size.width / 2 - 400,
		"outerY": player.size.height / 2 - 300,
		"outerWidth": 800,
		"outerHeight": 600
	};
	for (var t = 0; t < levels[level].trashCount; t++) {
		spawnRandomly(data.entities, "trash", trashDeadZone);
	}

	var obstacleDeadZone = {
		"x": player.size.width / 2 - 400,
		"y": player.size.height / 2 - 300,
		"width": 800,
		"height": 600,
		"plusShaped": false
	};
	for (var o = 0; o < levels[level].obstacleCount; o++) {
		spawnRandomly(data.entities, "obstacle", obstacleDeadZone);
	}

	// give player entity a target to propel it toward center of screen
	// position it at top-center
	player.target = center;

	shrinkBoundingBox(player, 0.4);

	// initialize two pieces of (small) trash to collide with the player
	var prefabsOfType = objectValues(prefabs).filter(function(prefab) {
		return prefab.type === "trash" && prefab.size.height <= 55;
	});
	for (var i = 0; i < 2; i++) {
		var trash = makePrefab(randomFrom(prefabsOfType), data.entities);
		var newComponents = clone({
			"movement2d": player.movement2d,
			"friction": player.friction,
			"velocity": player.velocity,
			"target": center,
			"position": {
				"x": player.position.x + ((i - 0.5) * 600) + ((i - 0.5) * player.size.width),
				"y": player.position.y + 600
			}
		});
		Object.keys(newComponents).forEach(function(key) {
			trash[key] = newComponents[key];
		});
		shrinkBoundingBox(trash, 0.4);
	}
};
