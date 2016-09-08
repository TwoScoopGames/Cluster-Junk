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
  for (var i = 0; i < level.maps.length; i++) {
    loadTilemap(game, level.maps[i]);
  }

  game.sounds.play("ambient-sea-track.mp3", {
    "loopStart": 0,
    "loopEnd": 0
  });
};

function loadTilemap(game, map) {
  var tilemap = require("../tiled/" + map + ".json");
  importTilemap(tilemap, game.entities, game.images);

  var spawn = game.entities.find("spawn")[0];
  if (spawn) {
    center(game, player, spawn);
    game.entities.destroy(spawn);
  }

  var tiles = game.entities.find("tile").slice();
  for (var i = 0; i < tiles.length; i++) {
    var tile = tiles[i];

    var prefab = game.entities.getComponent(tile, "prefab");
    if (prefab) {
      convertToPrefab(game, prefab, tile);
    } else {
      // var collisions = game.entities.addComponent(tile, "boxCollider");
      // collisions.group = "terrain";

      // stretch tiles by 2 pixels to get rid of gaps caused by zooming in/out
      var image = game.entities.getComponent(tile, "image");
      image.destinationWidth += 2;
      image.destinationHeight += 2;

      resizeCollisionRectangles(game, tile);
      game.entities.setComponent(tile, "type", "terrain");
      game.entities.removeComponent(tile, "tile");
    }
  }
}

function resizeCollisionRectangles(game, tile) {
  var position = game.entities.getComponent(tile, "position");
  var size = game.entities.getComponent(tile, "size");
  var image = game.entities.getComponent(tile, "image");
  var collisionPattern = game.entities.getComponent(tile, "collisionPattern");
  if (!collisionPattern) {
    return;
  }
  collisionPattern = collisionPattern.toString();

  if (collisionPattern === "12") {
    size.height /= 2;
    image.sourceHeight = size.height;
    image.destinationHeight = size.height;
  } else if (collisionPattern === "34") {
    size.height /= 2;
    position.y += size.height;
    image.sourceY += size.height;
  } else if (collisionPattern === "13") {
    size.width /= 2;
    image.sourceWidth = size.width;
    image.destinationWidth = size.width;
  } else if (collisionPattern === "24") {
    size.width /= 2;
    position.x += size.width;
    image.sourceX += size.width;
  } else if (collisionPattern === "1") {
    size.height /= 2;
    image.sourceHeight = size.height;
    image.destinationHeight = size.height;
    size.width /= 2;
    image.sourceWidth = size.width;
    image.destinationWidth = size.width;
  } else if (collisionPattern === "2") {
    size.height /= 2;
    image.sourceHeight = size.height;
    image.destinationHeight = size.height;
    size.width /= 2;
    image.sourceWidth = size.width;
    image.destinationWidth = size.width;
    position.x += size.width;
    image.sourceX += size.width;
  } else if (collisionPattern === "3") {
    size.height /= 2;
    image.sourceHeight = size.height;
    image.destinationHeight = size.height;
    position.y += size.height;
    image.sourceY += size.height;
    size.width /= 2;
    image.sourceWidth = size.width;
    image.destinationWidth = size.width;
  } else if (collisionPattern === "4") {
    size.height /= 2;
    image.sourceHeight = size.height;
    image.destinationHeight = size.height;
    position.y += size.height;
    image.sourceY += size.height;
    size.width /= 2;
    image.sourceWidth = size.width;
    image.destinationWidth = size.width;
    position.x += size.width;
    image.sourceX += size.width;
  }
}

function convertToPrefab(game, prefab, tile) {
  var tileImage = game.entities.getComponent(tile, "image");
  var tileSize = game.entities.getComponent(tile, "size");
  shrinkBoundingBox(tileSize, tileImage, 0.4);

  var tilePosition = game.entities.getComponent(tile, "position");
  var trash = game.prefabs.instantiate(game.entities, prefab);
  var trashImage = game.entities.getComponent(trash, "image");
  var trashPosition = game.entities.getComponent(trash, "position");
  var trashSize = game.entities.getComponent(trash, "size");
  trashPosition.x = tilePosition.x;
  trashPosition.y = tilePosition.y;
  if (game.entities.getComponent(trash, "type") !== "obstacle") {
    shrinkBoundingBox(trashSize, trashImage, 0.4);
  }


  var rotation = game.entities.addComponent(trash, "rotation");
  rotation.angle = game.entities.getComponent(trash, "type") === "obstacle" ? 0 : random.inRange((Math.PI / -3), (Math.PI / 3));

  game.entities.destroy(tile);
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
