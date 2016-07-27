"use strict";

var midpoint = function(p1, p2) {
  var x = ((p2.x - p1.x) / 2) + p1.x;
  var y = ((p2.y - p1.y) / 2) + p1.y;
  return { "x": x, "y": y };
};

var offset = function(point1, point2, range) {
  var angle = Math.atan2(point2.y - point1.y, point2.x - point1.x) + (Math.PI / 2);
  var radius = -(range / 2) + Math.random() * range;

  var x = point1.x + radius * Math.cos(angle);
  var y = point1.y + radius * Math.sin(angle);

  return { "x": x, "y": y };
};

var distance = function(start, end) {
  return Math.sqrt(Math.pow((end.x - start.x), 2) + Math.pow((end.y - start.y),2));
};

var getLightningPoints = function(start, end) {
  if (distance(start,end) < 30) {
    return [start, end];
  }

  var m = offset(midpoint(start, end), end, 40);
  var l1 = getLightningPoints(start, m);
  var l2 = getLightningPoints(m, end);
  return l1.concat(l2);
};

module.exports = function spawnLightning(x1, y1, x2, y2, game, forkChance) {
  var points = getLightningPoints({ "x": x1, "y": y1 }, { "x": x2, "y": y2 });

  var entity = game.entities.create();
  game.entities.set(entity, "lightning", {
    "points": points
  });

  if (Math.random() < forkChance) {
    var forkStart = points[Math.floor(Math.random() * points.length)];
    var forkEnd = offset(points[points.length - 1], points[0], 180);
    spawnLightning(forkStart.x, forkStart.y, forkEnd.x, forkEnd.y, game, forkChance);
  }
};
