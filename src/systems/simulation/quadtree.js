var rbush = require("rbush");

module.exports = function(ecs, game) {
  var tree = rbush();
  var items = [];

  game.entities.registerSearch("quadtree", ["boxCollider", "position", "size"]);

  function remove(id) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        items.splice(i, 1);
        return;
      }
    }
  }
  game.entities.onRemoveComponent("position", remove);
  game.entities.onRemoveComponent("size", remove);
  game.entities.onRemoveComponent("boxCollider", remove);

  function load() {
    tree.clear();
    items.length = 0;

    var ids = game.entities.find("quadtree");
    for (var i = 0; i < ids.length; i++) {
      // console.log(ids[i], "load");
      var position = game.entities.getComponent(ids[i], "position");
      var size = game.entities.getComponent(ids[i], "size");
      var item = {
        id: ids[i],
        minX: position.x,
        minY: position.y,
        maxX: position.x + size.width,
        maxY: position.y + size.height
      };
      items.push(item);
    }

    tree.load(items);
  }

  function collide(item) {
    // console.log(item.id, "collide");
    var boxCollider = game.entities.getComponent(item.id, "boxCollider");
    boxCollider.entities.length = 0;

    var collisions = tree.search(item);
    for (var j = 0; j < collisions.length; j++) {
      var other = collisions[j];
      if (item.id === other.id) {
        continue;
      }
      boxCollider.entities.push(other.id);
    }
  }

  function collideAll() {
    for (var i = 0; i < items.length; i++) {
      collide(items[i]);
    }
  }

  ecs.add(function quadtree() {
    if (items.length === 0) {
      load();
      collideAll();
    }

    for (var i = 0; i < items.length; i++) {
      var item = items[i];

      var position = game.entities.getComponent(item.id, "position");
      var size = game.entities.getComponent(item.id, "size");
      if (position.x !== item.minX || position.y !== item.minY) {
        // console.log(item.id, "moved");
        tree.remove(item);
        item.minX = position.x;
        item.minY = position.y;
        item.maxX = position.x + size.width;
        item.maxY = position.y + size.height;
        tree.insert(item);
        collide(item);
      }
    }
  });
};
