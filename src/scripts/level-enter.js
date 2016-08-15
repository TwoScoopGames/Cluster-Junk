var importTilemap = require("splat-ecs/lib/import-from-tiled");
var levels = require("../data/levels.json");
var random = require("splat-ecs/lib/random");

var player = 0;

module.exports = function(game) { // eslint-disable-line no-unused-vars
  var level = levels[game.arguments.level || 0];

  game.entities.setComponent(player, "radius", level.radius);
  game.entities.setComponent(player, "goalRadius", level.goalRadius);
  game.entities.getComponent(player, "timers").goalTimer.max = level.maxTime * 1000;
  game.entities.setComponent(2, "message", level.message);
  loadTilemap(game, level.map);

  game.sounds.play("ambient-sea-track.mp3", {
    "loopStart": 0,
    "loopEnd": 0
  });
};

function loadTilemap(game, map) {
  var tilemap = require("../tiled/" + map + ".json");
  importTilemap(tilemap, game.entities, game.images);

  var spawn = game.entities.find("spawn")[0];
  center(game, player, spawn);
  game.entities.destroy(spawn);

  var tiles = game.entities.find("tile").slice();
  for (var i = 0; i < tiles.length; i++) {
    var tile = tiles[i];
    var tileImage = game.entities.get(tile, "image");
    var tilePosition = game.entities.get(tile, "position");
    var tileSize = game.entities.get(tile, "size");
    shrinkBoundingBox(tileSize, tileImage, 0.4);
    var prefab = game.entities.get(tile, "prefab");
    if (prefab) {
      var trash = game.prefabs.instantiate(game.entities, prefab);
      var trashImage = game.entities.get(trash, "image");
      var trashPosition = game.entities.get(trash, "position");
      var trashSize = game.entities.get(trash, "size");
      trashPosition.x = tilePosition.x;
      trashPosition.y = tilePosition.y;
      shrinkBoundingBox(trashSize, trashImage, 0.4);

      game.entities.set(trash, "rotation", {
        "angle": game.entities.get(trash, "type") === "obstacle" ? 0 : random.inRange((Math.PI / -3), (Math.PI / 3)),
        "x": trashSize.width / 2,
        "y": trashSize.height / 2
      });
      game.entities.destroy(tile);
    }
  }
}

function center(game, entity, target) {
  var targetPosition = game.entities.getComponent(target, "position");
  var targetSize = game.entities.getComponent(target, "size");

  var entityPosition = game.entities.getComponent(entity, "position");
  var entitySize = game.entities.getComponent(entity, "size");

  entityPosition.x = targetPosition.x + (targetSize.width / 2) - (entitySize.width / 2);
  entityPosition.y = targetPosition.y + (targetSize.height / 2) - (entitySize.height / 2);
}

function shrinkBoundingBox(entitySize, entityImage, pct) {
  var xl = Math.floor(entitySize.width * pct);
  var yl = Math.floor(entitySize.height * pct);
  entitySize.width -= xl;
  entitySize.height -= yl;
  entityImage.destinationX -= Math.floor(xl / 2);
  entityImage.destinationY -= Math.floor(yl / 2);
}
