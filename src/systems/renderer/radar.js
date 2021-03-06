"use strict";

var easing = require("easing-js");

//easing
var radarStart = -50;
var time = 0;
var duration = 500;

//radar
var angle = 0;
var period = 5000;
var radius = 80;

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function renderRadar(entity, elapsed) { // eslint-disable-line no-unused-vars

    //timer image
    var radarY = 5;
    if (time < duration) {
      time += elapsed;
      radarY = easing.easeOutElastic(time, radarStart, 55, duration);
    }
    var radarImage = game.images.get("radar.png");
    game.context.drawImage(radarImage, 5, radarY);

    // radar screen
    if (time < duration) {
      return;
    }

    var angularVelocity = -((Math.PI * 2) / period);
    var distanceThisFrame = angularVelocity * elapsed;
    angle += distanceThisFrame;

    var cx = 5 + Math.floor(radarImage.width / 2);
    var cy = radarY + Math.floor(radarImage.height / 2);
    var x = radius * Math.cos(angle);
    var y = radius * Math.sin(angle);

    game.context.strokeStyle =  "#6abd44";
    game.context.lineWidth = 1;
    game.context.beginPath();
    game.context.moveTo(cx, cy);
    game.context.lineTo(cx + x, cy + y);
    game.context.stroke();

    var playerPosition = game.entities.getComponent(entity, "position");

    var ids = game.entities.find("position");
    for (var i = 0; i < ids.length; i++) {
      var id = ids[i];
      var entityType = game.entities.getComponent(id, "type");
      var entitySticky = game.entities.getComponent(id, "sticky");
      var entityPlayer = game.entities.getComponent(id, "player");
      var entityPosition = game.entities.getComponent(id, "position");

      if ((entityType !== "trash" && entityType !== "obstacle") || entitySticky || entityPlayer) {
        continue;
      }

      var dx = entityPosition.x - playerPosition.x;
      var dy = entityPosition.y - playerPosition.y;

      var max = 1000 * 1000;
      var dist = Math.max(Math.min((dx * dx + dy * dy), max), -max);
      var scaledDist = dist / max * (radius - 3);

      var boxAngle = Math.atan2(entityPosition.y - playerPosition.y, entityPosition.x - playerPosition.x);

      var ex = scaledDist * Math.cos(boxAngle);
      var ey = scaledDist * Math.sin(boxAngle);

      game.context.fillStyle = "#6abd44";
      if (entityType === "obstacle") {
        game.context.fillStyle = "red";
      }
      game.context.fillRect(Math.floor(cx + ex - 1), Math.floor(cy + ey - 1), 3, 3);
    }
  }, "player");
};
