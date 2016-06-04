"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  game.entities.registerSearch("renderPlayer", ["player", "position", "size", "radius"]);
  ecs.addEach(function renderPlayer(entity, context) { // eslint-disable-line no-unused-vars
    context.strokeStyle = "yellow";
    context.beginPath();

    var position = game.entities.get(entity, "position");
    var size = game.entities.get(size, "position");
    var radius = game.entities.get(size, "radius");

    var cx = position.x + size.width / 2;
    var cy = position.y + size.height / 2;
    context.arc(cx, cy, radius, 0, Math.PI * 2);
    context.stroke();
  }, "renderPlayer");
};
