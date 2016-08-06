
module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function rain(entity, elapsed) { // eslint-disable-line no-unused-vars
    var position = game.entities.get(entity, "position");
    var size = game.entities.get(entity, "size");

    // var oldOp = game.context.globalCompositeOperation;
    // game.context.globalCompositeOperation = "darken";

    var opacity = 0.5;
    var lightning = game.entities.find("lightning")[0];
    if (lightning) {
      var lightningInfo = game.entities.get(lightning, "lightning");
      opacity = Math.min(1.0, Math.max(0, lightningInfo.elapsed - 100) / 400) * 0.5;
    }
    game.context.fillStyle = "rgba(0, 0, 0, " + opacity + ")";
    game.context.fillRect(position.x, position.y, size.width, size.height);

    // game.context.globalCompositeOperation = oldOp;
  }, "camera");
};
