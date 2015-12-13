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

function makeTrash(entities, components) {
	var trash = makePrefab("box", entities);
	trash.position.x = randomInRange(-2000, 2000);
	trash.position.y = randomInRange(-2000, 2000);

	components = components || {};
	Object.keys(components).forEach(function (key) {
		trash[key] = components[key];
	});
}

function randomInRange(min, max) {
	return min + Math.random() * (max - min);
}

module.exports = function(data) { // eslint-disable-line no-unused-vars
	data.sounds.play("ambient-sea-track", {
		"loopStart": 0,
		"loopEnd": 0
	});

	for (var i = 0; i < 200; i++) {
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
	player.movement2d.upMax = player.movement2d.leftMax = -0.03;
	player.movement2d.downMax = player.movement2d.rightMax = 0.03;

	// initialize two pieces of trash to collide with the player

	// position is bottom-left
	makeTrash(data.entities, {
		"target": center,
		"position": {
			"x": cameraPosition.x,
			"y": cameraPosition.y + canvas.height
		}
	});
	// position is bottom-right
	makeTrash(data.entities, {
		"target": center,
		"position": {
			"x": cameraPosition.x + canvas.width,
			"y": cameraPosition.y + canvas.height
		}
	});
};
