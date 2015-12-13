"use strict";

var simpleEasing = require("../../simpleEasing");

var noticeY = -300;
var noticeTextY = noticeY + 168;


module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(notice, context) { // eslint-disable-line no-unused-vars
		if(notice.message){
			noticeY += simpleEasing(noticeY, -80, 0.2);
			var noticeBoard = data.images.get("notice");
			context.drawImage(noticeBoard, (data.canvas.width / 2) - (noticeBoard.width /2), noticeY);

			context.fillStyle = "#3e311a";
			context.font = "55px blanch";
			noticeTextY += simpleEasing(noticeTextY, 105, 0.2);
			context.fillText(notice.message, 340,noticeTextY);
		}
	}, ["notice"]);
};
