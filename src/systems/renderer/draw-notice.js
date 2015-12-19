"use strict";

var easing = require("easing-js");
var centerText = require("../../center-text");

var noticeStart = -300;

var time = 0;
var duration = 2000;

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	data.entities.registerSearch("drawNotice", ["notice", "message"]);
	ecs.addEach(function(entity, context, elapsed) { // eslint-disable-line no-unused-vars
		var noticeY = -60;
		if (time < duration) {
			time += elapsed;
			noticeY = easing.easeOutElastic(time, noticeStart, 240, duration);
		}
		var noticeBoard = data.images.get("notice");
		context.drawImage(noticeBoard, (data.canvas.width / 2) - (noticeBoard.width /2), noticeY);

		if (time >= duration) {
			context.fillStyle = "#3e311a";
			context.font = "55px blanch";
			var message = data.entities.get(entity, "message");
			centerText(data.canvas, context, message, 0, 130);
		}
	}, "drawNotice");
};
