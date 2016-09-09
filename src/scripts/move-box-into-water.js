
module.exports = function(entity, game) {
  var position = game.entities.getComponent(entity, "position");

  var viewport = 0;

  var follow = game.entities.addComponent(viewport, "follow");
  follow.id = entity;

  game.entities.getComponent(entity, "timers").playSplashSfx.running = true;
  game.entities.getComponent(entity, "timers").playIntroMusicPartTwo.running = true;

  var moveToPoint = game.entities.addComponent(entity, "moveToPoint");
  moveToPoint.x = 1500;
  moveToPoint.y = 1550;
  moveToPoint.maxDistanceAway = 10;
  moveToPoint.script = "./scripts/strike-and-transform-box";

  var easing = game.entities.addComponent(entity, "easing");
  easing["scale.scale"] = {
    "type": "easeOutCubic",
    "start": 2.0,
    "end": 1.0,
    "time": 0,
    "max": 500
  };
  easing["position.x"] = {
    "type": "easeOutQuart",
    "start": position.x,
    "end": position.x + 500,
    "time": 0,
    "max": 3000
  };
  easing["position.y"] = {
    "type": "easeOutElastic",
    "start": position.y,
    "end": position.y + 500,
    "time": 0,
    "max": 3000
  };

  game.entities.removeComponent(entity, "match");
};
