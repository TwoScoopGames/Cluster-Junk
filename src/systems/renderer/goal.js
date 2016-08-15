"use strict";

var cx = 100;
var cy = 300;
var radius = 50;

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function renderGoal(entity, elapsed) { // eslint-disable-line no-unused-vars

    var playerRadius = game.entities.getComponent(entity, "radius");
    var goalRadius = game.entities.getComponent(entity, "goalRadius");
    var progressRadius = (playerRadius / goalRadius) * radius;

    game.context.lineWidth = 1;
    game.context.fillStyle = "rgba(106, 189, 68, 0.55)";
    game.context.beginPath();
    game.context.arc(cx, cy, progressRadius, 0, Math.PI * 2);
    game.context.fill();

    game.context.strokeStyle = "rgba(228, 227, 158, 0.48)";
    game.context.beginPath();
    game.context.arc(cx, cy, radius, 0, Math.PI * 2);
    game.context.stroke();

    var progressText = Math.floor(playerRadius);
    var goalText = "/" + goalRadius + "m";
    game.context.fillStyle = "#ffffff";
    game.context.strokeStyle = "#3e311a";

    game.context.font = "68px blanch";
    game.context.lineWidth = 8;
    var progressTextX = cx - (game.context.measureText(progressText).width / 2) | 0;
    var progressTextY = cy;
    game.context.strokeText(progressText, progressTextX, progressTextY);
    game.context.fillText(progressText, progressTextX, progressTextY);

    game.context.font = "30px blanch";
    game.context.lineWidth = 4;
    var goalTextX = cx + 25 - (game.context.measureText(goalText).width / 2) | 0;
    var goalTextY = cy + 30;
    game.context.strokeText(goalText, goalTextX, goalTextY);
    game.context.fillText(goalText, goalTextX, goalTextY);

  }, ["player"]);
};
