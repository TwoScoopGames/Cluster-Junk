"use strict";

var easing = require("../../easing");

var noticeStart = -300;

var time = 0;
var duration = 2000;

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(notice, context, elapsed) { // eslint-disable-line no-unused-vars
		if(notice.message){

			//noticeboard
			var noticeY = -60;
			if(time < duration){
				time += elapsed;
				noticeY = easing.bounceEaseOut(time, noticeStart, 230, duration);
			}
			var noticeBoard = data.images.get("notice");
			context.drawImage(noticeBoard, (data.canvas.width / 2) - (noticeBoard.width /2), noticeY);



			if(time >= duration){
				context.fillStyle = "#3e311a";
				context.font = "55px blanch";
				centerText(data.canvas, context, notice.message, 0, 130);
			}

		}
	}, ["notice"]);
};



function centerText(canvas, context, text, offsetX, offsetY) {
	var w = context.measureText(text).width;
	var x = offsetX + (canvas.width / 2) - (w / 2) | 0;
	var y = offsetY | 0;
	context.fillText(text, x, y);
}
