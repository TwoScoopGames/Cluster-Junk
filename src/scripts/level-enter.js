var importTilemap = require("splat-ecs/lib/import-from-tiled");
var level1 = require("../tiled/level1.json");
var prefabs = require("../data/prefabs");
var random = require("splat-ecs/lib/random");

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
    if (prefab.type === undefined) {
      return accum;
    }
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

  var mins = [];
  var maxs = [];
  for (var a = 1; a < max * max; a++) {
    var s = getSize(a, min, max);
    if (mins[s] === undefined || a < mins[s]) {
      mins[s] = a;
    }
    if (maxs[s] === undefined || a > maxs[s]) {
      maxs[s] = a;
    }
  }
  for (var i = 0; i < mins.length; i++) {
    console.log("size " + (i + 1) + " min: ", mins[i], " max: ", maxs[i]);
  }

  return buckets;
}

function getSize(a, min, max) {
  var numBuckets = 10;
  var range = max - min;
  var area = Math.sqrt(a);
  var size = Math.round((area - min) / range * numBuckets);
  size = Math.min(numBuckets - 1, size);
  size = Math.max(0, size);
  return size;
}

module.exports = function(game) { // eslint-disable-line no-unused-vars
  importTilemap(level1, game.entities);

  var buckets = calculateSizes();

  var spawn = game.entities.find("spawn")[0];
  var player = 0;
  center(game, player, spawn);

  var gs = {};

  var tiles = game.entities.find("tileSize");
  while (tiles.length > 0) {
    var size = game.entities.get(tiles[0], "tileSize") - 1;
    if (gs[size] === undefined) {
      gs[size] = groups(buckets[size]);
    }
    var group = game.entities.get(tiles[0], "tileGroup");
    var prefab = pickPrefabByGroup(buckets[size], group, gs[size]);
    var trash = game.instantiatePrefab(prefab);
    center(game, trash, tiles[0]);
  }
};

function groups(bucket) {
  bucket = bucket.slice(0);
  var g = {};

  var pos = Math.floor(Math.random() * bucket.length);
  g.a = bucket[pos];
  bucket.splice(pos, 1);

  if (bucket.length === 0) {
    g.b = g.a;
  } else {
    pos = Math.floor(Math.random() * bucket.length);
    g.b = bucket[pos];
    bucket.splice(pos, 1);
  }

  if (bucket.length === 0) {
    g.c = g.b;
  } else {
    pos = Math.floor(Math.random() * bucket.length);
    g.c = bucket[pos];
    bucket.splice(pos, 1);
  }

  return g;
}

function pickPrefabByGroup(bucket, group, gs) {
  return gs[group] || random.from(bucket);
}

function center(game, entity, target) {
  var targetPosition = game.entities.get(target, "position");
  var targetSize = game.entities.get(target, "size");

  var entityPosition = game.entities.get(entity, "position");
  var entitySize = game.entities.get(entity, "size");

  entityPosition.x = targetPosition.x + (targetSize.width / 2) - (entitySize.width / 2);
  entityPosition.y = targetPosition.y + (targetSize.height / 2) - (entitySize.height / 2);

  game.entities.destroy(target);
}
