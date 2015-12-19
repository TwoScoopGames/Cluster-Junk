"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context, elapsed) { // eslint-disable-line no-unused-vars
		context.fillStyle = "#3e311a";
		context.strokeStyle = "#ffffff";
		context.lineWidth = 7;
		context.font = "50px blanch";

		var pointChange = data.entities.get(entity, "pointChange");
		var position = data.entities.get(entity, "position");

		if (pointChange >= 0) {
			centerTextInMiddle(data.canvas, context, "+" + pointChange, position.x, position.y);
		} else {
			context.fillStyle = "#b22222";
			centerTextInMiddle(data.canvas, context, "-" + Math.abs(pointChange), position.x, position.y);
		}
	}, "pointChange");

	ecs.addEach(function(entity, context, elapsed) { // eslint-disable-line no-unused-vars
		var points = data.entities.get(entity, "points");

		context.fillStyle = "#3e311a";
		context.strokeStyle = "#ffffff";
		context.lineWidth = 7;
		context.font = "70px blanch";
		bottomRightAlignText(data.canvas, context, points, 30, 30);
	}, "player");
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
