"use strict";

function randomInRange(min, max) {
  return min + Math.random() * (max - min);
}

function spawnDrop(array, position, length, thickness, color) {
  array.push({
    "position": {
      "x": position.y,
      "y": position.x
    },
    "length": length,
    "color": color,
    "thickness": thickness
  });
}

function drawDrop(context, drop) {
  context.strokeStyle = drop.color;
  context.lineWidth = drop.thickness;
  context.beginPath();
  context.moveTo(drop.position.x, drop.position.y);
  context.lineTo(drop.position.x + drop.length, drop.position.y - randomInRange(drop.length + 2, drop.length + 4));
  context.stroke();
}

function drawDrops(context, array) {
  for (var i = 0; i < array.length; i++) {
    drawDrop(context, array[i]);
  }
}

function moveDrops(array, elapsed) {
  for (var i = 0; i < array.length; i++) {
    array[i].position.x -= elapsed * 2;
    array[i].position.y += elapsed * 2;
  }
}

function deleteOffScreenDrops(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].position.y > 1920) {
      array.splice(i, 1);
    }
  }
}

var rainDrops = [];

var maxDrops = 1000;

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function rain(entity, elapsed) { // eslint-disable-line no-unused-vars

    if (rainDrops.length < maxDrops) {
      var randomXY = {
        "x": randomInRange(-500, -50),
        "y": randomInRange(0, 3000)
      };
      var randomLength = randomInRange(50, 100);
      var randomThickness = randomInRange(0.5, 4);
      spawnDrop(rainDrops, randomXY, randomLength, randomThickness, "rgba(255,255,255,0.5)");
    }
    moveDrops(rainDrops, elapsed);
    drawDrops(game.context, rainDrops);
    deleteOffScreenDrops(rainDrops);

  }, "camera");
};
