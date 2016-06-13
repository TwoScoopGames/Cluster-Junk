var importTilemap = require("splat-ecs/lib/import-from-tiled");
var level1 = require("../tiled/level1.json");

var prefabsBySize = {
  "small": "paper-wad",
  "medium": "egg-carton",
  "large": "tire"
};

module.exports = function(game) { // eslint-disable-line no-unused-vars
  importTilemap(level1, game.entities);

  var spawn = game.entities.find("spawn")[0];
  var player = 0;
  center(game, player, spawn);

  var tiles = game.entities.find("tileSize");
  while (tiles.length > 0) {
    var size = game.entities.get(tiles[0], "tileSize");
    var trash = game.instantiatePrefab(prefabsBySize[size]);
    center(game, trash, tiles[0]);
  }
};

function center(game, entity, target) {
  var targetPosition = game.entities.get(target, "position");
  var targetSize = game.entities.get(target, "size");

  var entityPosition = game.entities.get(entity, "position");
  var entitySize = game.entities.get(entity, "size");

  entityPosition.x = targetPosition.x + (targetSize.width / 2) - (entitySize.width / 2);
  entityPosition.y = targetPosition.y + (targetSize.height / 2) - (entitySize.height / 2);

  game.entities.destroy(target);
}
