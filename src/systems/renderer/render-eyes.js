"use strict";

var centerText = require("../../center-text");

function pupilOffset(entity) {
	var px = 0;
	var py = 0;
	if (entity.movement2d.left) {
		px -= 20;
	}
	if (entity.movement2d.right) {
		px += 20;
	}
	if (entity.movement2d.up) {
		py -= 10;
	}
	if (entity.movement2d.down) {
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

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	var actionPressed = fallingEdge(data.input.button.bind(data.input, "action"));

	ecs.addEach(function(entity, context, elapsed) { // eslint-disable-line no-unused-vars
		var camera = data.entities.entities[1];

		var cx = entity.position.x + entity.size.width / 2;
		var cy = entity.position.y + entity.size.height / 2;

		var cpctx = (cx - camera.position.x) / camera.size.width;
		var x = data.canvas.width * cpctx;
		var cpcty = (cy - camera.position.y) / camera.size.height;
		var y = data.canvas.height * cpcty;

		var eyes = data.images.get("eyes");
		var ex = x - (eyes.width / 2);
		var ey = y - (eyes.height / 2);
		context.drawImage(eyes, ex, ey);

		var pupils = data.images.get("pupils");
		var px = x - (pupils.width / 2);
		var py = y - (pupils.height / 2);

		var po = pupilOffset(entity);
		pupilOffsetX = tween(pupilOffsetX, po.x);
		pupilOffsetY = tween(pupilOffsetY, po.y);
		px += pupilOffsetX;
		py += pupilOffsetY;

		context.drawImage(pupils, px, py);

		var lids = data.images.get("eyelashes-f3");
		lidTime += elapsed;
		while (lidTime > lidFrameTimes[lidFrame]) {
			lidTime -= lidFrameTimes[lidFrame];
			lidFrame++;
			if (lidFrame >= lidFrames.length) {
				lidFrame = 2;
			}
		}
		if (lidFrame === 2 && entity.playerController2d === undefined && !entity.gameOver) {
			entity.playerController2d = {
				"up": "up",
				"down": "down",
				"left": "left",
				"right": "right"
			};
			entity.timers.goalTimer.running = true;
		}
		var lw = lids.width / 3;
		var lx = x - (lw / 2);
		var ly = y - (lids.height / 2);
		context.drawImage(lids, (lidFrames[lidFrame] * lw), 0, lw, lids.height, lx, ly, lw, lids.height);

		if (entity.gameOver) {
			var won = entity.radius >= entity.goalRadius;
			if (won) {
				var whaleLeftHappy = data.images.get("whaleLeftHappy");
				context.drawImage(whaleLeftHappy, -111, (data.canvas.height - whaleLeftHappy.height) + 145);
				var whaleLeftFlipperHappy = data.images.get("whaleLeftFlipperHappy");
				context.drawImage(whaleLeftFlipperHappy, 320, (data.canvas.height - whaleLeftFlipperHappy.height) + 45);

				context.fillStyle = "white";
				context.font = "55px blanch";
				centerText(data.canvas, context, "PRESS SPACE TO CONTINUE", 0, data.canvas.height - 50);
			} else {
				var whaleLeftSad = data.images.get("whaleLeftSad");
				context.drawImage(whaleLeftSad, -111, (data.canvas.height - whaleLeftSad.height) + 145);
				var whaleLeftFlipperSad = data.images.get("whaleLeftFlipperSad");
				context.drawImage(whaleLeftFlipperSad, 320, (data.canvas.height - whaleLeftFlipperSad.height) + 45);

				context.fillStyle = "white";
				context.font = "55px blanch";
				centerText(data.canvas, context, "PRESS SPACE FOR TITLE", 0, data.canvas.height - 50);
			}
			if (actionPressed()) {
				var numLevels = require("../../data/levels.json").length;
				var level = data.arguments.level || 0;
				level++;
				if (!won || data.arguments.level + 1 === numLevels) {
					data.switchScene("title");
				} else {
					data.switchScene("main", { level: level });
				}
			}
		}
	}, ["player", "position", "size", "radius", "eyes"]);
};
