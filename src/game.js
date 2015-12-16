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

/*
 * the radius of the inscribed circle of the zone where touching won't
 * cause the player to move; A.K.A.: 1/2 the length of one side (it's a
 * square). this is intentionally chosen to be the same as the camera's
 * follow distance in relation to the player, though these two variables
 * are not currently linked to one another (but maybe they should be).
 */
var movementFreeZoneRadius = 200;

function createTouchTargets() {
	var computedCanvasStyle = getComputedStyle(canvas); // to get size in CSS pixels
	var canvasSize = {
		"width": parseInt(computedCanvasStyle.width),
		"height": parseInt(computedCanvasStyle.height)
	};
	var upDownTargetWidth = canvasSize.width;
	var upDownTargetHeight = canvasSize.height / 2 - movementFreeZoneRadius;
	var leftRightTargetWidth = canvasSize.width / 2 - movementFreeZoneRadius;
	var leftRightTargetHeight = canvasSize.height;
	var actionTargetWidth = canvasSize.width;
	var actionTargetHeight = canvasSize.height;

	setTouchInput("up", 0, 0, upDownTargetWidth, upDownTargetHeight);
	setTouchInput("down", 0, canvasSize.height - upDownTargetHeight, upDownTargetWidth, upDownTargetHeight);
	setTouchInput("left", 0, 0, leftRightTargetWidth, leftRightTargetHeight);
	setTouchInput("right", canvasSize.width - leftRightTargetWidth, 0, leftRightTargetWidth, leftRightTargetHeight);
	setTouchInput("action", 0, 0, actionTargetWidth, actionTargetHeight);
}

createTouchTargets();
window.onresize = createTouchTargets;

function percentLoaded() {
	if (images.totalImages + sounds.totalSounds === 0) {
		return 1;
	}
	return (images.loadedImages + sounds.loadedSounds) / (images.totalImages + sounds.totalSounds);
}
var loading = Splat.loadingScene(canvas, percentLoaded, game.scene);
loading.start(context);
