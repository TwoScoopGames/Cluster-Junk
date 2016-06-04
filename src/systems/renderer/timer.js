"use strict";

var easing = require("easing-js");

var timerStart = -50;

var time = 0;
var duration = 500;

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function renderTimer(entity, elapsed) { // eslint-disable-line no-unused-vars

    //timer image
    var timerY = 5;
    if (time < duration) {
      time += elapsed;
      timerY = easing.easeOutElastic(time, timerStart, 55, duration);
    }
    game.context.drawImage(game.images.get("timer.png"), (game.canvas.width - (game.images.get("timer.png").width)) - 5 , timerY);

    // Time text
    if (time >= duration) {
      var goalTimer = game.entities.get(entity, "timers").goalTimer;
      var remainingSeconds = Math.round((goalTimer.max - goalTimer.time) / 1000);

      if (remainingSeconds < 10) {
        remainingSeconds = "00" + remainingSeconds;
      } else if (remainingSeconds < 100) {
        remainingSeconds = "0" + remainingSeconds;
      }
      game.context.fillStyle = "white";
      game.context.font = "54px blanch";
      game.context.fillText(remainingSeconds, (game.canvas.width - 107), 93);
    }
  }, "player");
};
