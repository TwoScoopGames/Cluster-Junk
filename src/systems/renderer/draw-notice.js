"use strict";

var simpleEasing = require("../../simpleEasing");

var noticeY = -300;
var noticeTextY = noticeY + 168;

function centerText(canvas, context, text, offsetX, offsetY) {
	var w = context.measureText(text).width;
	var x = offsetX + (canvas.width / 2) - (w / 2) | 0;
	var y = offsetY | 0;
	context.fillText(text, x, y);
}


module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(notice, context) { // eslint-disable-line no-unused-vars
		if(notice.message){
			noticeY += simpleEasing(noticeY, -80, 0.2);
			var noticeBoard = data.images.get("notice");
			context.drawImage(noticeBoard, (data.canvas.width / 2) - (noticeBoard.width /2), noticeY);

			context.fillStyle = "#3e311a";
			context.font = "55px blanch";
			noticeTextY += simpleEasing(noticeTextY, 106, 0.2);
			centerText(data.canvas, context, notice.message, 0, noticeTextY);
		}
	}, ["notice"]);
};
