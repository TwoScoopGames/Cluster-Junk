"use strict";

function makeTrash(entities) {
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
}

function randomInRange(min, max) {
	return min + Math.random() * (max - min);
}

module.exports = function(data) { // eslint-disable-line no-unused-vars
	for (var i = 0; i < 200; i++) {
		makeTrash(data.entities);
	}
};
