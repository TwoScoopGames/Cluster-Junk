"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.add(function(entities) { // eslint-disable-line no-unused-vars
    var tileSize = 32;

    var camera = game.entities.find("camera")[0];
    var cameraPos = game.entities.get(camera, "position");
    var cameraSize = game.entities.get(camera, "size");

    var startX = Math.floor(cameraPos.x / tileSize) * tileSize;
    var startY = Math.floor(cameraPos.y / tileSize) * tileSize;

    game.context.strokeStyle = "rgba(255, 255, 255, 0.2)";
    for (var y = startY; y <= cameraPos.y + cameraSize.height; y += tileSize) {
      for (var x = startX; x <= cameraPos.x + cameraSize.width; x += tileSize) {
        game.context.strokeRect(x, y, tileSize, tileSize);
      }
    }
  });
};
