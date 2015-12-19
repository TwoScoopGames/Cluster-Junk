"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context, elapsed) { // eslint-disable-line no-unused-vars

		var points = data.entities.get(entity, "points");
		var pointsDisplayQueue = data.entities.get(entity, "pointsDisplayQueue");
		var pointsDisappearQueue = data.entities.get(entity, "pointsDisappearQueue");

		context.fillStyle = "#3e311a";
		context.strokeStyle = "#ffffff";
		context.lineWidth = 7;
		context.font = "70px blanch";
		bottomRightAlignText(data.canvas, context, points, 30, 30);

		context.font = "50px blanch";

		pointsDisplayQueue.forEach(function(pointChange) {
			var offsetX = Math.floor(Math.random() * 380 - 190);
			var offsetY = Math.floor(Math.random() * 380 - 190);
			pointsDisappearQueue.push({
				"pointChange": pointChange,
				"offsetX": offsetX,
				"offsetY": offsetY
			});
			// FIXME: this is evil
			setTimeout(function () {
				if (pointsDisappearQueue.length) {
					pointsDisappearQueue.splice(0, 1);
				}
			}, 900);
		});

		data.entities.set(entity, "pointsDisplayQueue", []);

		pointsDisappearQueue.forEach(function (item) {
			var pointChange = item.pointChange;
			var offsetX = item.offsetX;
			var offsetY = item.offsetY;
			if (pointChange >= 0) {
				centerTextInMiddle(data.canvas, context, "+" + pointChange, offsetX, offsetY);
			} else {
				context.fillStyle = "#b22222";
				centerTextInMiddle(data.canvas, context, "-" + Math.abs(pointChange), offsetX, offsetY);
				context.fillStyle = "#ffffff";
			}
		});

	}, ["player"]);
};

function bottomRightAlignText(canvas, context, text, offsetX, offsetY) {
	var w = context.measureText(text).width;
	var h = 20; // approximate; figure out how to detect dynamically later.
	var x = Math.floor(canvas.width - w - offsetX);
	var y = Math.floor(canvas.height - h - offsetY);
	context.strokeText(text, x, y);
	context.fillText(text, x, y);
}

function centerTextInMiddle(canvas, context, text, offsetX, offsetY) {
	var w = context.measureText(text).width;
	var x = Math.floor(offsetX + (canvas.width / 2) - (w / 2));
	var y = Math.floor(canvas.height / 2 + offsetY);
	context.strokeText(text, x, y);
	context.fillText(text, x, y);
}
