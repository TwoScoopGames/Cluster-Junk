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
	var trash = makePrefab("box", entities);
	trash.position.x = randomInRange(-2000, 2000);
	trash.position.y = randomInRange(-2000, 2000);
}

function randomInRange(min, max) {
	return min + Math.random() * (max - min);
}

module.exports = function(data) { // eslint-disable-line no-unused-vars
	data.sounds.play("ambient-sea-track", {
		loopStart: 0,
		loopEnd: 0
	});

	for (var i = 0; i < 200; i++) {
		makeTrash(data.entities);
	}
};
