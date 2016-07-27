"use strict";

var cx = 100;
var cy = 300;
var radius = 50;

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function renderGoal(entity, elapsed) { // eslint-disable-line no-unused-vars

    var playerRadius = game.entities.get(entity, "radius");
    var goalRadius = game.entities.get(entity, "goalRadius");
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

  }, ["player"]);
};
