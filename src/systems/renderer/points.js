"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context, elapsed) { // eslint-disable-line no-unused-vars

		context.fillStyle = "#3e311a";
		context.strokeStyle = "#ffffff";
		context.lineWidth = 7;
		context.font = "70px blanch";
		bottomRightAlignText(data.canvas, context, entity.points, 30, 30);

		entity.pointsDisplayQueue.forEach(function(pointChange) {
			var offsetX = Math.floor(Math.random() * 460 - 230);
			var offsetY = Math.floor(Math.random() * 460 - 230);
			entity.pointsDisappearQueue.push({
				pointChange: pointChange,
				offsetX: offsetX,
				offsetY: offsetY
			});
			setTimeout(function () {
				if (entity.pointsDisappearQueue.length) {
					entity.pointsDisappearQueue.splice(0, 1);
				}
			}, 900);
		});

		entity.pointsDisplayQueue = [];

		entity.pointsDisappearQueue.forEach(function (item) {
			var pointChange = item.pointChange;
			var offsetX = item.offsetX;
			var offsetY = item.offsetY;
			if (pointChange >= 0) {
				centerText(data.canvas, context, "+" + pointChange, offsetX, offsetY);
			} else {
				context.strokeStyle = "#b22222";
				centerText(data.canvas, context, "-" + Math.abs(pointChange), offsetX, offsetY);
				context.strokeStyle = "#ffffff";
			}
		});

	}, ["player"]);
};

function bottomRightAlignText(canvas, context, text, offsetX, offsetY) {
	var w = context.measureText(text).width;
	var h = 20; // approximate; figure out how to detect dynamically later.
	var x = canvas.width - w - offsetX;
	var y = canvas.height - h - offsetY;
	context.strokeText(text, x, y);
	context.fillText(text, x, y);
}

function centerText(canvas, context, text, offsetX, offsetY) {
	var w = context.measureText(text).width;
	var x = offsetX + (canvas.width / 2) - (w / 2) | 0;
	var y = offsetY | 0;
	context.strokeText(text, x, y);
	context.fillText(text, x, y);
}
