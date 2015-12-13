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

function spawnRandomly(entities, type) {
	var prefabsOfType = objectValues(prefabs).filter(function(prefab){
		return prefab.type === type;
	});
	var entity = makePrefab(randomFrom(prefabsOfType), entities);
	entity.position.x = randomInRange(-2000, 2000);
	entity.position.y = randomInRange(-2000, 2000);
}

function randomInRange(min, max) {
	return min + Math.random() * (max - min);
}

function randomFrom(array){
	return array[Math.floor(Math.random() * array.length)];
}

module.exports = function(data) { // eslint-disable-line no-unused-vars
	data.sounds.play("ambient-sea-track", {
		loopStart: 0,
		loopEnd: 0
	});

	for (var t = 0; t < 100; t++) {
		spawnRandomly(data.entities, "trash");
	}
	for (var o = 0; o < 5; o++) {
		spawnRandomly(data.entities, "obstacle");
	}
};
