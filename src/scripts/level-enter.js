var importTilemap = require("splat-ecs/lib/import-from-tiled");
var level1 = require("../tiled/level1.json");
var prefabs = require("../data/prefabs");
var random = require("splat-ecs/lib/random");

var prefabsBySize = {
  "small": 0,
  "medium": 1,
  "large": 2
};

function calculateSizes() {
  var areas = Object.keys(prefabs).map(function(name) {
    var prefab = prefabs[name];
    return Math.sqrt(prefab.size.width * prefab.size.height);
  });
  areas.sort(function(a, b) { return a - b; });

  var min = areas[0];
  var max = areas[areas.length - 1];

  var range = max - min;
  var numBuckets = 10;

  var buckets = Object.keys(prefabs).reduce(function(accum, name) {
    var prefab = prefabs[name];
    var area = Math.sqrt(prefab.size.width * prefab.size.height);
    var size = Math.round((area - min) / range * numBuckets);
    size = Math.min(numBuckets - 1, size);
    size = Math.max(0, size);

    if (accum[size] === undefined) {
      accum[size] = [];
    }
    accum[size].push(name);
    return accum;
  }, []);
  console.log(buckets);
  return buckets;
}

module.exports = function(game) { // eslint-disable-line no-unused-vars
  importTilemap(level1, game.entities);

  var buckets = calculateSizes();

  var spawn = game.entities.find("spawn")[0];
  var player = 0;
  center(game, player, spawn);

  var tiles = game.entities.find("tileSize");
  while (tiles.length > 0) {
    var size = game.entities.get(tiles[0], "tileSize");
    var trash = game.instantiatePrefab(random.from(buckets[prefabsBySize[size]]));
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
