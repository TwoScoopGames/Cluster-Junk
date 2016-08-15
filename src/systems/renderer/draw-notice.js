"use strict";

var easing = require("easing-js");
var centerText = require("../../center-text");

var noticeStart = -300;

var time = 0;
var duration = 2000;

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  game.entities.registerSearch("drawNotice", ["notice", "message"]);
  ecs.addEach(function drawNotice(entity, elapsed) { // eslint-disable-line no-unused-vars
    var noticeY = -60;
    if (time < duration) {
      time += elapsed;
      noticeY = easing.easeOutElastic(time, noticeStart, 240, duration);
    }
    var noticeBoard = game.images.get("notice.png");
    game.context.drawImage(noticeBoard, (game.canvas.width / 2) - (noticeBoard.width / 2), noticeY);

    if (time >= duration) {
      game.context.fillStyle = "#3e311a";
      game.context.font = "55px blanch";
      var message = game.entities.getComponent(entity, "message");
      centerText(game.canvas, game.context, message, 0, 130);
    }
  }, "drawNotice");
};
