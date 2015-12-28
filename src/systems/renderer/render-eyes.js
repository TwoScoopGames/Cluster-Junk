"use strict";

var centerText = require("../../center-text");

function pupilOffset(movement2d) {
	var px = 0;
	var py = 0;
	if (movement2d.left) {
		px -= 20;
	}
	if (movement2d.right) {
		px += 20;
	}
	if (movement2d.up) {
		py -= 10;
	}
	if (movement2d.down) {
		py += 20;
	}
	return { x: px, y: py };
}

function tween(start, end, pct) {
	pct = pct || 0.1;
	var diff = end - start;
	return start + (diff * pct);
}

var pupilOffsetX = 0;
var pupilOffsetY = 0;
var lidFrame = 0;
var lidTime = 0;
var lidFrames = [2, 1, 0, 1, 2, 1];
var lidFrameTimes = [2000, 200, 2500, 60, 60, 60];

var fallingEdge = require("../../falling-edge");

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	var actionPressed = fallingEdge(game.input.button.bind(game.input, "action"));

	game.entities.registerSearch("renderEyes", ["player", "position", "size", "radius", "eyes"]);

	ecs.addEach(function renderEyes(entity, context, elapsed) { // eslint-disable-line no-unused-vars
		var position = game.entities.get(entity, "position");
		var size = game.entities.get(entity, "size");
		var radius = game.entities.get(entity, "radius");
		var goalRadius = game.entities.get(entity, "goalRadius");

		var cx = position.x + size.width / 2;
		var cy = position.y + size.height / 2;

		var camera = 1;
		var cameraPosition = game.entities.get(camera, "position");
		var cameraSize = game.entities.get(camera, "size");

		var cpctx = (cx - cameraPosition.x) / cameraSize.width;
		var x = game.canvas.width * cpctx;
		var cpcty = (cy - cameraPosition.y) / cameraSize.height;
		var y = game.canvas.height * cpcty;

		var eyes = game.images.get("eyes");
		var ex = x - (eyes.width / 2);
		var ey = y - (eyes.height / 2);
		context.drawImage(eyes, ex, ey);

		var pupils = game.images.get("pupils");
		var px = x - (pupils.width / 2);
		var py = y - (pupils.height / 2);

		var po = pupilOffset(game.entities.get(entity, "movement2d"));
		pupilOffsetX = tween(pupilOffsetX, po.x);
		pupilOffsetY = tween(pupilOffsetY, po.y);
		px += pupilOffsetX;
		py += pupilOffsetY;

		context.drawImage(pupils, px, py);

		var lids = game.images.get("eyelashes-f3");
		lidTime += elapsed;
		while (lidTime > lidFrameTimes[lidFrame]) {
			lidTime -= lidFrameTimes[lidFrame];
			lidFrame++;
			if (lidFrame >= lidFrames.length) {
				lidFrame = 2;
			}
		}
		var gameOver = game.entities.get(entity, "gameOver");
		if (lidFrame === 2 && game.entities.get(entity, "playerController2d") === undefined && !gameOver) {
			game.entities.set(entity, "playerController2d", {
				"up": "up",
				"down": "down",
				"left": "left",
				"right": "right"
			});
			game.entities.get(entity, "timers").goalTimer.running = true;
		}
		var lw = lids.width / 3;
		var lx = x - (lw / 2);
		var ly = y - (lids.height / 2);
		context.drawImage(lids, (lidFrames[lidFrame] * lw), 0, lw, lids.height, lx, ly, lw, lids.height);

		if (gameOver) {
			var won = radius >= goalRadius;
			if (won) {
				var whaleLeftHappy = game.images.get("whaleLeftHappy");
				context.drawImage(whaleLeftHappy, -111, (game.canvas.height - whaleLeftHappy.height) + 145);
				var whaleLeftFlipperHappy = game.images.get("whaleLeftFlipperHappy");
				context.drawImage(whaleLeftFlipperHappy, 320, (game.canvas.height - whaleLeftFlipperHappy.height) + 45);

				context.fillStyle = "white";
				context.font = "55px blanch";
				centerText(game.canvas, context, "PRESS SPACE TO CONTINUE", 0, game.canvas.height - 50);
			} else {
				var whaleLeftSad = game.images.get("whaleLeftSad");
				context.drawImage(whaleLeftSad, -111, (game.canvas.height - whaleLeftSad.height) + 145);
				var whaleLeftFlipperSad = game.images.get("whaleLeftFlipperSad");
				context.drawImage(whaleLeftFlipperSad, 320, (game.canvas.height - whaleLeftFlipperSad.height) + 45);

				context.fillStyle = "white";
				context.font = "55px blanch";
				centerText(game.canvas, context, "PRESS SPACE FOR TITLE", 0, game.canvas.height - 50);
			}
			if (actionPressed()) {
				var numLevels = require("../../data/levels.json").length;
				var level = game.arguments.level || 0;
				level++;
				if (!won) {
					game.switchScene("title");
				} else if (game.arguments.level + 1 === numLevels) {
					game.switchScene("finished");
				} else {
					game.switchScene("main", { level: level });
				}
			}
		}
	}, "renderEyes");
};
