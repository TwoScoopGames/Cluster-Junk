var particles = require("splat-ecs/lib/particles");
var random = require("splat-ecs/lib/random");
var Soundfont = require("soundfont-player");

var marimba = null;
Soundfont.instrument(new AudioContext(), "marimba")
  .then(function(m) {
    marimba = m;
  });

var notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
var comboNotes = [];
for (var i = 4; i < 6; i++) {
  comboNotes = comboNotes.concat(notes.map(function(note) {
    return note + i;
  }));
}
comboNotes = comboNotes.concat("C6");

var lastNoteNumber = -1;
function handleCombo(comboTimer) {
  comboTimer.time = 0;
  if (comboTimer.running) {
    marimba.play(comboNotes[++lastNoteNumber % comboNotes.length]);
  } else {
    comboTimer.running = true;
    lastNoteNumber++;
  }
  comboTimer.running = true;
}

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

var camera = 1;
var viewport = 3;

var cfg = new particles.Config("debris");
cfg.arcWidth = Math.PI * 2;
cfg.qtyMin = 2;
cfg.qtyMax = 8;
cfg.velocityMax = 2;

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  function resolveCollisionShortest(a, b, target) {
    var aPosition = game.entities.getComponent(a, "position");
    var aSize = game.entities.getComponent(a, "size");
    var bPosition = game.entities.getComponent(b, "position");
    var bSize = game.entities.getComponent(b, "size");
    if (target === undefined) {
      target = a;
    }
    var targetPosition = game.entities.getComponent(target, "position");
    var targetVelocity = game.entities.getComponent(target, "velocity");

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
    var playerPosition = game.entities.getComponent(player, "position");
    var playerSize = game.entities.getComponent(player, "size");
    var playerRadius = game.entities.getComponent(player, "radius");
    var playerArea = game.entities.getComponent(player, "area");
    var playerTimers = game.entities.getComponent(player, "timers");

    game.entities.getComponent(entity, "collisions").forEach(function(other) {
      if (game.entities.getComponent(other, "sticky")) {
        return;
      }

      var otherNoises = game.entities.getComponent(other, "noises");
      if (otherNoises && !playerTimers.silent.running) {
        game.sounds.play(random.from(otherNoises));
        playerTimers.silent.running = true;
      }

      game.entities.addComponent(other, "velocity");

      var otherPosition = game.entities.getComponent(other, "position");
      var otherSize = game.entities.getComponent(other, "size");
      var otherType = game.entities.getComponent(other, "type");

      var distSq = distanceSquared(playerPosition, playerSize, otherPosition, otherSize);
      var otherArea = otherSize.width * otherSize.height;
      if (distSq < playerRadius * playerRadius && otherType !== "terrain") {
        playerArea += otherArea;

        var match = game.entities.addComponent(other, "match");
        match.id = player;
        match.offsetX = otherPosition.x - playerPosition.x;
        match.offsetY = otherPosition.y - playerPosition.y;

        game.entities.setComponent(other, "sticky", true);
        //game.sounds.play("sfx-power-up.mp3");
        handleCombo(playerTimers.combo);
        var notice = game.entities.find("notice")[0];
        if (notice) {
          game.entities.setComponent(notice, "message", game.entities.getComponent(other, "name"));
        }

        var shakeSmall = game.entities.addComponent(camera, "shake");
        shakeSmall.duration = 100;
        shakeSmall.magnitude = 10;
      } else if (otherType === "obstacle" || otherType === "terrain") {
        resolveCollisionShortest(entity, other, player);

        var shakeLarge = game.entities.addComponent(camera, "shake");
        shakeLarge.duration = 100;
        shakeLarge.magnitude = 30;

        cfg.origin = other;
        particles.create(game, cfg);
      } else {
        resolveCollisionShortest(other, entity);
      }
    });
    playerRadius = Math.sqrt(playerArea / Math.PI * 2);
    game.entities.setComponent(player, "radius", playerRadius);
    game.entities.setComponent(player, "area", playerArea);

    var viewportSize = game.entities.getComponent(viewport, "size");
    var viewportAspectRatio = viewportSize.width / viewportSize.height;

    var cameraSize = game.entities.getComponent(camera, "size");
    var size = Math.floor(playerRadius * 2 * 3);
    var easing = game.entities.getComponent(camera, "easing");
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
