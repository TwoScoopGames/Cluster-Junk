var particles = require("splat-ecs/lib/particles");
var random = require("splat-ecs/lib/random");

var waste = new particles.Config("particle-ooze-1");
waste.angle = Math.PI;
waste.arcWidth = Math.PI / 8;
waste.lifeSpanMin = 4000;
waste.lifeSpanMax = 4000;
waste.qtyMin = 1;
waste.qtyMax = 1;
waste.sizeMin = 1;
waste.sizeMax = 1.5;
waste.velocityMin = 0.01;
waste.velocityMax = 0.1;

var prefabs = [
  // "particle-ooze-1",
  "particle-ooze-2",
  "particle-ooze-3",
  "particle-ooze-3",
  "particle-ooze-4",
  "particle-ooze-5",
  "particle-ooze-6",
  "particle-ooze-7",
  "particle-ooze-8"
];

module.exports = function(entity, game) {
  var pos = game.entities.get(entity, "position");
  waste.origin.x = pos.x + 20;
  waste.origin.y = pos.y + 110;

  for (var i = 0; i < 4; i++) {
    waste.prefab = random.from(prefabs);
    particles.create(game, waste);
  }
};
