"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  game.entities.registerSearch("moveToPointSearch", ["movement2d", "moveToPoint", "position"]);
  ecs.addEach(function moveToPoint(entity, elapsed) { // eslint-disable-line no-unused-vars
    var position = game.entities.getComponent(entity, "position");
    var movement2d = game.entities.getComponent(entity, "movement2d");
    var target = game.entities.getComponent(entity, "moveToPoint");

    movement2d.up = false;
    movement2d.down = false;
    movement2d.left = false;
    movement2d.right = false;

    var dist = distanceSquared(position.x, position.y, target.x, target.y);
    if (dist <= target.maxDistanceAway * target.maxDistanceAway) {
      game.entities.removeComponent(entity, "moveToPoint");
      if (target.script) {
        var script = game.require(target.script);
        script(entity, game);
      }
      return;
    }
    if (position.y > target.y) {
      movement2d.up = true;
    }
    if (position.y < target.y) {
      movement2d.down = true;
    }
    if (position.x > target.x) {
      movement2d.left = true;
    }
    if (position.x < target.x) {
      movement2d.right = true;
    }
  }, "moveToPointSearch");
};

function distanceSquared(x1, y1, x2, y2) {
  return ((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2));
}
