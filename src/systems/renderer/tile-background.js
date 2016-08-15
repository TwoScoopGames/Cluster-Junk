"use strict";

var time = 0;
var rowHeight = 60;
var waveHeight = 20;
var wavePeriod = 4000;
var rowsBeforeRepeat = 8;
var rowsOffset = Math.PI * 2 / rowsBeforeRepeat;

module.exports = function(ecs, game) {
  ecs.add(function tileBackground(entities, elapsed) {
    var camera = 1;
    var cameraPosition = game.entities.getComponent(camera, "position");
    var cameraSize = game.entities.getComponent(camera, "size");

    game.context.fillStyle = "#1c325f";
    game.context.fillRect(Math.floor(cameraPosition.x), Math.floor(cameraPosition.y), cameraSize.width, cameraSize.height);

    time += elapsed;

    var f1 = game.images.get("waves.png");

    var startX = Math.floor(cameraPosition.x / f1.width) * f1.width;
    var startRow = Math.floor(cameraPosition.y / rowHeight);
    var startY = (startRow - 1) * rowHeight;

    for (var y = startY; y <= cameraPosition.y + cameraSize.height; y += rowHeight) {
      var even = Math.floor(y / rowHeight) % 2;
      var offset = y / rowHeight % rowsBeforeRepeat * rowsOffset;
      var waveY = y + Math.sin(time / wavePeriod * Math.PI * 2 + offset) * waveHeight;

      for (var x = startX; x <= cameraPosition.x + cameraSize.width + f1.width; x += f1.width) {
        var waveX = x + Math.sin(time / wavePeriod * 2 * Math.PI * 2 + offset) * waveHeight / 2;
        game.context.drawImage(f1, even ? waveX : waveX - 100, waveY, f1.width, f1.height);
      }
    }
  });
};
