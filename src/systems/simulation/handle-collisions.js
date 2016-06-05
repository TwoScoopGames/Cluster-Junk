"use strict";

function center(position, size) {
  var x = position.x + (size.width / 2);
  var y = position.y + (size.height / 2);
  return { x: x, y: y };
}

function distanceSquared(aPosition, aSize, bPosition, bSize) {
  var ca = center(aPosition, aSize);
  var cb = center(bPosition, bSize);

  var dx = ca.x - cb.x;
  var dy = ca.y - cb.y;

  return dx * dx + dy * dy;
}

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function makePoints(entities, points) {
  var id = entities.create();

  entities.set(id, "position", {
    x: Math.floor(Math.random() * 380 - 190),
    y: Math.floor(Math.random() * 380 - 190)
  });
  entities.set(id, "pointChange", points);
  entities.set(id, "timers", {
    disappear: {
      running: true,
      time: 0,
      max: 900,
      script: "./scripts/delete-entity"
    }
  });
}

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  function resolveCollisionShortest(a, b, target) {
    var aPosition = game.entities.get(a, "position");
    var aSize = game.entities.get(a, "size");
    var bPosition = game.entities.get(b, "position");
    var bSize = game.entities.get(b, "size");
    if (target === undefined) {
      target = a;
    }
    var targetPosition = game.entities.get(target, "position");
    var targetVelocity = game.entities.get(target, "velocity");

    var bottom = [0, bPosition.y + bSize.height - aPosition.y, 0, 0.5];
    var top = [0, bPosition.y - aSize.height - aPosition.y, 0, -0.5];
    var right = [bPosition.x + bSize.width - aPosition.x, 0, 0.5, 0];
    var left = [bPosition.x - aSize.width - aPosition.x, 0, -0.5, 0];

    var smallest = [bottom, top, right, left].reduce(function(prev, curr) {
      if (Math.abs(curr[0] + curr[1]) < Math.abs(prev[0] + prev[1])) {
        return curr;
      }
      return prev;
    });
    targetPosition.x += smallest[0];
    targetPosition.y += smallest[1];
    targetVelocity.x += smallest[2];
    targetVelocity.y += smallest[3];
  }

  game.entities.registerSearch("handleCollisions", ["sticky", "collisions"]);
  ecs.addEach(function handleCollisions(entity, elapsed) { // eslint-disable-line no-unused-vars
    var player = 0;
    var playerPosition = game.entities.get(player, "position");
    var playerSize = game.entities.get(player, "size");
    var playerRadius = game.entities.get(player, "radius");
    var playerArea = game.entities.get(player, "area");
    var playerPoints = game.entities.get(player, "points");
    var playerTimers = game.entities.get(player, "timers");

    game.entities.get(entity, "collisions").forEach(function(other) {
      if (game.entities.get(other, "sticky")) {
        return;
      }

      var otherNoises = game.entities.get(other, "noises");
      if (otherNoises && !playerTimers.silent.running) {
        game.sounds.play(randomFrom(otherNoises));
        playerTimers.silent.running = true;
      }

      game.entities.set(other, "velocity", { x: 0, y: 0 });

      var otherPosition = game.entities.get(other, "position");
      var otherSize = game.entities.get(other, "size");
      var otherType = game.entities.get(other, "type");

      var distSq = distanceSquared(playerPosition, playerSize, otherPosition, otherSize);
      var otherArea = otherSize.width * otherSize.height;
      if (distSq < playerRadius * playerRadius) {
        playerArea += otherArea;
        var newPoints = Math.ceil(Math.sqrt(otherArea) / 10) * 10;
        playerPoints += newPoints;
        makePoints(game.entities, newPoints);
        game.entities.set(other, "match", {
          id: player,
          offsetX: otherPosition.x - playerPosition.x,
          offsetY: otherPosition.y - playerPosition.y
        });
        game.entities.set(other, "sticky", true);
        game.sounds.play("sfx-power-up.mp3");
        var notice = 2;
        game.entities.set(notice, "message", game.entities.get(other, "name"));
      } else if (otherType === "obstacle") {
        resolveCollisionShortest(entity, other, player);
        if (!game.entities.get(player, "recovering")) {
          var pointDeduction = -1 * Math.min(Math.floor(Math.sqrt(otherArea) / 10), playerPoints);
          if (pointDeduction) {
            playerPoints += pointDeduction;
            makePoints(game.entities, pointDeduction);
            game.entities.set(player, "recovering", true);
            playerTimers.recoveryTimer.running = true;
          }
        }
      } else {
        resolveCollisionShortest(other, entity);
      }
    });
    playerRadius = Math.sqrt(playerArea / Math.PI * 2);
    game.entities.set(player, "radius", playerRadius);
    game.entities.set(player, "area", playerArea);
    game.entities.set(player, "points", playerPoints);

    var viewport = 3;
    var viewportSize = game.entities.get(viewport, "size");
    var viewportAspectRatio = viewportSize.width / viewportSize.height;

    var camera = 1;
    var cameraSize = game.entities.get(camera, "size");
    var size = Math.floor(playerRadius * 2 * 3);
    var easing = game.entities.get(camera, "easing");
    if (cameraSize.height !== size && (easing["size.height"] === undefined || easing["size.height"].end !== size)) {
      easing["size.width"] = {
        time: 0,
        max: 1000,
        start: cameraSize.width,
        end: size * viewportAspectRatio,
        type: "easeInOutQuad"
      };
      easing["size.height"] = {
        time: 0,
        max: 1000,
        start: cameraSize.height,
        end: size,
        type: "easeInOutQuad"
      };
    }
  }, "handleCollisions");
};
