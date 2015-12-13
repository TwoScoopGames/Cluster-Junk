"use strict";

var prefabs = require("../data/prefabs");

function clone(obj) {
	return JSON.parse(JSON.stringify(obj)); // gross
}

function makePrefab(name, entities) {
	var e = entities.add();
	var copy = clone(prefabs[name]);
	copy.id = e.id;
	entities.entities[copy.id] = copy;
	return copy;
}

function makeTrash(entities) {
	var trash = makePrefab(randomFrom(Object.keys(prefabs)), entities);
	trash.position.x = randomInRange(-2000, 2000);
	trash.position.y = randomInRange(-2000, 2000);
}

function randomInRange(min, max) {
	return min + Math.random() * (max - min);
}

function randomFrom(array){
	return array[Math.floor(Math.random() * array.length)];
}

module.exports = function(data) { // eslint-disable-line no-unused-vars
	var i;

	data.sounds.play("ambient-sea-track", {
		"loopStart": 0,
		"loopEnd": 0
	});

	for (i = 0; i < 0; i++) {
		makeTrash(data.entities);
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

	// initialize two pieces of trash to collide with the player
	for (i = 0; i < 2; i++) {
		var trash = makePrefab(randomFrom(Object.keys(prefabs)), data.entities);
		var newComponents = clone({
			"movement2d": player.movement2d,
			"friction": player.friction,
			"velocity": player.velocity,
			"target": center,
			"position": {
				"x": cameraPosition.x + (i * canvas.width),
				"y": cameraPosition.y + canvas.height
			}
		});
		Object.keys(newComponents).forEach(function(key) {
			trash[key] = newComponents[key];
		});
	}
};
