
module.exports = function(entity, game) {
  var position = game.entities.get(entity, "position");

  var viewport = 0;
  game.entities.set(viewport, "follow", {
    "id": entity,
    "distance": 0
  });
  game.entities.get(entity, "timers").playSplashSfx.running = true;
  game.entities.set(entity, "moveToPoint", {
    "x": 1500,
    "y": 1550,
    "maxDistanceAway": 10,
    "script": "./scripts/strike-and-transform-box"
  });
  game.entities.set(entity, "easing", {
    "scale.scale": {
      "type": "easeOutCubic",
      "start": 2.0,
      "end": 1.0,
      "time": 0,
      "max": 500
    },
    "position.x": {
      "type": "easeOutQuart",
      "start": position.x,
      "end": position.x + 500,
      "time": 0,
      "max": 3000
    },
    "position.y": {
      "type": "easeOutElastic",
      "start": position.y,
      "end": position.y + 500,
      "time": 0,
      "max": 3000
    }
  });
  game.entities.remove(entity, "match");
};
