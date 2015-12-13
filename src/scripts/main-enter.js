"use strict";

var prefabs = require("../data/prefabs");
var objectValues = require("../objectValues");

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

function spawnRandomly(entities, type) {
	var prefabsOfType = objectValues(prefabs).filter(function(prefab){
		return prefab.type === type;
	});
	var entity = makePrefab(randomFrom(prefabsOfType), entities);
	entity.position.x = randomInRange(-2000, 2000);
	entity.position.y = randomInRange(-2000, 2000);
	shrinkBoundingBox(entity, 0.4);
	entity.rotation = {
		"angle": randomInRange(0, (Math.PI *2)),
		"x": entity.size.width/ 2,
		"y": entity.size.height/ 2
	};
}

function randomInRange(min, max) {
	return min + Math.random() * (max - min);
}

function randomFrom(array){
	return array[Math.floor(Math.random() * array.length)];
}

module.exports = function(data) { // eslint-disable-line no-unused-vars

	data.sounds.play("ambient-sea-track", {
		"loopStart": 0,
		"loopEnd": 0
	});

	for (var t = 0; t < 100; t++) {
		spawnRandomly(data.entities, "trash");
	}
	for (var o = 0; o < 5; o++) {
		spawnRandomly(data.entities, "obstacle");
	}

	var cameraPosition = data.entities.entities[1].position;
	var canvas = data.canvas;
	var player = data.entities.entities[0];
	var playerSize = player.size;

	var center = {
		"x": cameraPosition.x + canvas.width / 2 - playerSize.width / 2,
		"y": cameraPosition.y + canvas.height / 2 - playerSize.height / 2
	};

	// give player entity a target to propel it toward center of screen
	// position it at top-center
	player.target = center;
	player.position = {
		"x": cameraPosition.x + canvas.width / 2 - playerSize.width / 2,
		"y": cameraPosition.y
	};
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
				"x": cameraPosition.x + (i * canvas.width / 2) + ((i - 1.5) * player.size.width) + (canvas.height / 2),
				"y": cameraPosition.y + canvas.height
			}
		});
		Object.keys(newComponents).forEach(function(key) {
			trash[key] = newComponents[key];
		});
		shrinkBoundingBox(trash, 0.4);
	}
};
