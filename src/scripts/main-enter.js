"use strict";

var prefabs = require("../data/prefabs");
var objectValues = require("../objectValues");

function clone(obj) {
	return JSON.parse(JSON.stringify(obj)); // gross
}

function makePrefab(prefab, entities) {
	var id = entities.create();
	Object.keys(prefab).forEach(function(key) {
		if (key === "id") {
			return;
		}
		entities.set(id, key, clone(prefab[key]));
	});
	return id;
}

function shrinkBoundingBox(entitySize, entityImage, pct) {
	var xl = Math.floor(entitySize.width * pct);
	var yl = Math.floor(entitySize.height * pct);
	entitySize.width -= xl;
	entitySize.height -= yl;
	entityImage.destinationX -= Math.floor(xl / 2);
	entityImage.destinationY -= Math.floor(yl / 2);
}

function spawnRandomly(entities, type, deadZone) {
	var prefabsOfType = objectValues(prefabs).filter(function(prefab){
		return prefab.type === type;
	});
	var entity = makePrefab(randomFrom(prefabsOfType), entities);

	var size = entities.get(entity, "size");
	var randomPoint = randomInRect(-4000, -4000, 8000, 8000, deadZone, size);
	entities.set(entity, "position", randomPoint);

	var image = entities.get(entity, "image");
	shrinkBoundingBox(size, image, 0.4);

	entities.set(entity, "rotation", {
		"angle": type === "obstacle" ? 0 : randomInRange((Math.PI / -3), (Math.PI / 3)),
		"x": size.width / 2,
		"y": size.height / 2
	});
}

function randomInRange(min, max) {
	return min + Math.random() * (max - min);
}

function randomInRect(x, y, width, height, deadZone, entitySize) {
	var point = {
		"x": randomInRange(x, x + width),
		"y": randomInRange(y, y + height)
	};
	if (deadZone) {
		while (inDeadZone(point, deadZone, entitySize)) {
			point = {
				"x": randomInRange(x, x + width),
				"y": randomInRange(y, y + height)
			};
		}
	}
	return point;
}

function inDeadZone(upperLeftPoint, deadZone, entitySize) {
	var points = [
		upperLeftPoint,
		{
			"x": upperLeftPoint.x + entitySize.width,
			"y": upperLeftPoint.y
		},
		{
			"x": upperLeftPoint.x,
			"y": upperLeftPoint.y + entitySize.height
		},
		{
			"x": upperLeftPoint.x + entitySize.width,
			"y": upperLeftPoint.x + entitySize.height
		}
	];
	for (var i = 0; i < 4; i++) {
		var point = points[i];
		var inInnerZone = point.x >= deadZone.x &&
			point.x < deadZone.x + deadZone.width &&
			point.y >= deadZone.y &&
			point.y < deadZone.y + deadZone.height;
		if (inInnerZone) {
			return true;
		}
		if (deadZone.plusShaped) {
			var inPlusZone =
				(point.x >= deadZone.x && point.x < deadZone.x + deadZone.width &&
					point.y >= deadZone.outerY && point.y < deadZone.outerY + deadZone.outerHeight) ||
				(point.x >= deadZone.outerX && point.x < deadZone.outerX + deadZone.outerWidth &&
					point.y >= deadZone.y && point.y < deadZone.y + deadZone.height);
			if (inPlusZone) {
				return true;
			}
		}
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

	var player = 0;
	var playerPosition = data.entities.get(player, "position");
	var playerSize = data.entities.get(player, "size");
	var playerImage = data.entities.get(player, "image");
	var playerScale = player.scale || 1;

	var camera = 1;
	var cameraPosition = data.entities.get(camera, "position");
	cameraPosition.x = -(data.canvas.width / 2) / playerScale + playerSize.width / 2;

	var level = data.arguments.level || 0;
	data.entities.set(player, "radius", levels[level].radius);
	data.entities.set(player, "goalRadius", levels[level].goalRadius);
	data.entities.get(player, "timers").goalTimer.max = levels[level].maxTime * 1000;
	data.entities.set(2, "message", levels[level].message);

	var trashDeadZone = {
		"x": playerSize.width / 2 - 180,
		"y": playerSize.height / 2 - 120,
		"width": 360,
		"height": 240,
		"plusShaped": true,
		"outerX": playerSize.width / 2 - 240,
		"outerY": playerSize.height / 2 - 450,
		"outerWidth": 480,
		"outerHeight": 600
	};
	for (var t = 0; t < levels[level].trashCount; t++) {
		spawnRandomly(data.entities, "trash", trashDeadZone);
	}

	var obstacleDeadZone = {
		"x": playerSize.width / 2 - 300,
		"y": playerSize.height / 2 - 200,
		"width": 600,
		"height": 400,
		"plusShaped": true,
		"outerX": playerSize.width / 2 - 400,
		"outerY": playerSize.height / 2 - 1000,
		"outerWidth": 800,
		"outerHeight": 1400
	};
	for (var o = 0; o < levels[level].obstacleCount; o++) {
		spawnRandomly(data.entities, "obstacle", obstacleDeadZone);
	}

	// give player entity a target to propel it toward center of screen
	// position it at top-center
	var center = {
		"x": playerPosition.x,
		"y": playerPosition.y + 300 - playerSize.height / 2
	};
	data.entities.set(player, "target", center);

	shrinkBoundingBox(playerSize, playerImage, 0.4);

	// initialize two pieces of (small) trash to collide with the player
	var prefabsOfType = objectValues(prefabs).filter(function(prefab) {
		return prefab.type === "trash" && prefab.size.height <= 55;
	});
	for (var i = 0; i < 2; i++) {
		var trash = makePrefab(randomFrom(prefabsOfType), data.entities);
		data.entities.set(trash, "movement2d", clone(data.entities.get(player, "movement2d")));
		data.entities.set(trash, "friction", clone(data.entities.get(player, "friction")));
		data.entities.set(trash, "velocity", { x: 0, y: 0 });
		data.entities.set(trash, "target", clone(center));
		data.entities.set(trash, "position", {
			"x": playerPosition.x + ((i - 0.5) * 600) + ((i - 0.5) * playerSize.width),
			"y": playerPosition.y + 600
		});
		shrinkBoundingBox(data.entities.get(trash, "size"), data.entities.get(trash, "image"), 0.4);
	}
};
