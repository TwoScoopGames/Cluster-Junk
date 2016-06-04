"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function renderPointsChange(entity, elapsed) { // eslint-disable-line no-unused-vars
    game.context.fillStyle = "#3e311a";
    game.context.strokeStyle = "#ffffff";
    game.context.lineWidth = 7;
    game.context.font = "50px blanch";

    var pointChange = game.entities.get(entity, "pointChange");
    var position = game.entities.get(entity, "position");

    if (pointChange >= 0) {
      centerTextInMiddle(game.canvas, game.context, "+" + pointChange, position.x, position.y);
    } else {
      game.context.fillStyle = "#b22222";
      centerTextInMiddle(game.canvas, game.context, "-" + Math.abs(pointChange), position.x, position.y);
    }
  }, "pointChange");

  ecs.addEach(function renderTotalPoints(entity, elapsed) { // eslint-disable-line no-unused-vars
    var points = game.entities.get(entity, "points");

    game.context.fillStyle = "#3e311a";
    game.context.strokeStyle = "#ffffff";
    game.context.lineWidth = 7;
    game.context.font = "70px blanch";
    bottomRightAlignText(game.canvas, game.context, points, 30, 30);
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
