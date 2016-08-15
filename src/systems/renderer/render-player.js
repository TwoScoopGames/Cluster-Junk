"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  game.entities.registerSearch("renderPlayer", ["player", "position", "size", "radius"]);
  ecs.addEach(function renderPlayer(entity, elapsed) { // eslint-disable-line no-unused-vars
    game.context.strokeStyle = "yellow";
    game.context.beginPath();

    var position = game.entities.getComponent(entity, "position");
    var size = game.entities.getComponent(size, "position");
    var radius = game.entities.getComponent(size, "radius");

    var cx = position.x + size.width / 2;
    var cy = position.y + size.height / 2;
    game.context.arc(cx, cy, radius, 0, Math.PI * 2);
    game.context.stroke();
  }, "renderPlayer");
};
