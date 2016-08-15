var particles = require("splat-ecs/lib/particles");

var water = new particles.Config("debris");
water.arcWidth = Math.PI * 2;
water.lifeSpanMin = 200;
water.lifeSpanMax = 500;
water.qtyMin = 20;
water.qtyMax = 20;
water.sizeMin = 10;
water.sizeMax = 15;
water.spreadType = "even";
water.velocityMin = 0.7;
water.velocityMax = 1.0;

module.exports = function(entity, game) {
  game.sounds.play("sfx-water-splash.mp3");

  var pos = game.entities.getComponent(entity, "position");
  water.origin.x = pos.x + 50;
  water.origin.y = pos.y + 40;
  particles.create(game, water);
};
