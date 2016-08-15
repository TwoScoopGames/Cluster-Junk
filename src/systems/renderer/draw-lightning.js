"use strict";

function drawLine(start, end, width, style, context) {
  //try to draw the whole line
  context.strokeStyle = style;
  context.lineWidth = width;
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.stroke();
}

function drawLines(points, width, style, context) {
  for (var x = 0; x < points.length - 1; x++) {
    drawLine(points[x], points[x + 1], width, style, context);
  }
}

var whiteFlashTime = 100;
var colorFadeTime = 200;
var whiteFadeTime = 750;

function drawLightning(points, context, elapsed, cameraPos, cameraSize) {
  if (elapsed < whiteFlashTime) {
    if (elapsed < whiteFlashTime / 2) {
      context.fillStyle = "rgba(0,0,0, 0.5)";
      context.fillRect(cameraPos.x, cameraPos.y, cameraSize.width, cameraSize.height);

      drawLines(points, 10, "rgba(255,255,255,1)", context);
    } else {
      context.fillStyle = "rgba(255,255,255, 0.5)";
      context.fillRect(cameraPos.x, cameraPos.y, cameraSize.width, cameraSize.height);

      drawLines(points, 10, "rgba(0,0,0,1)", context);
    }
  } else if (elapsed < whiteFlashTime + whiteFadeTime) {
    var opacity = Math.min(1 - ((elapsed - whiteFlashTime) / colorFadeTime), 1);
    var opacity2 = Math.min(1 - ((elapsed - whiteFlashTime) / whiteFadeTime), 1);
    drawLines(points, 10, "rgba(255,0,255," + opacity + ")", context);
    drawLines(points, 5, "rgba(255,255,255," + opacity2 + ")", context);
  }
}

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function drawLightningSystem(entity, elapsed) { // eslint-disable-line no-unused-vars

    var camera = game.entities.find("camera")[0];
    var cameraPos = game.entities.getComponent(camera, "position");
    var cameraSize = game.entities.getComponent(camera, "size");

    var lightning = game.entities.getComponent(entity, "lightning");
    if (lightning.elapsed > whiteFadeTime) {
      game.entities.destroy(entity);
    } else {
      if (lightning.elapsed === undefined) {
        lightning.elapsed = 0;
      } else {
        lightning.elapsed += elapsed;
      }

      drawLightning(lightning.points, game.context, lightning.elapsed, cameraPos, cameraSize);
    }

  }, "lightning");
};
