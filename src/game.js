"use strict";

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var Splat = require("splat-ecs");

var animations = require("./data/animations");
var entities = require("./data/entities");

var images = new Splat.ImageLoader();
images.loadFromManifest(require("./data/images"));

var input = window.input = require("./data/inputs");

var scenes = require("./data/scenes");

var sounds = new Splat.SoundLoader();
sounds.loadFromManifest(require("./data/sounds"));

var systems = require("./data/systems");

var game = new Splat.Game(canvas, animations, entities, images, input, require, scenes, sounds, systems);

function setTouchInput(controlName, x, y, width, height) {
	var newInput = {
		"device": "touch",
		"x": x,
		"y": y,
		"width": width,
		"height": height
	};
	var inputs = input[controlName].inputs;
	var index = inputs.reduce(function(prev, curr, currIndex) {
		if (!isNaN(prev)) {
			return prev;
		}
		return curr.device === "touch" ? currIndex : null;
	}, null);
	index = index || index === 0 ? index : inputs.length;
	inputs[index] = newInput;
}

function createTouchTargets() {
	// for now, "action" is the only static touch target (takes up full screen)
	setTouchInput("action", 0, 0, canvas.width, canvas.height);
}

createTouchTargets();
window.addEventListener("resize", createTouchTargets);

function percentLoaded() {
	if (images.totalImages + sounds.totalSounds === 0) {
		return 1;
	}
	return (images.loadedImages + sounds.loadedSounds) / (images.totalImages + sounds.totalSounds);
}
var loading = Splat.loadingScene(canvas, percentLoaded, game.scene);
loading.start(context);
