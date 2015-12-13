"use strict";

function makeTrash(entities, components) {
	var trash = entities.add();
	trash.image = {
		"sourceX": 0,
		"sourceY": 0,
		"sourceWidth": 0,
		"sourceHeight": 0,
		"destinationX": 0,
		"destinationY": 0,
		"destinationWidth": 101,
		"destinationHeight": 88
	};
	trash.animation = {
		"time": 0,
		"frame": 0,
		"loop": true,
		"speed": 1,
		"name": "box"
	};
	trash.position = {
		"x": randomInRange(-2000, 2000),
		"y": randomInRange(-2000, 2000)
	};
	trash.size = {
		"width": 101,
		"height": 88
	};
	trash.collisions = [];

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
