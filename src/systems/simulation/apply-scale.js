
module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function onPositionLeftOf(entity, elapsed) { // eslint-disable-line no-unused-vars
    var scale = game.entities.get(entity, "scale");
    var image = game.entities.get(entity, "image");
    var size = game.entities.get(entity, "size");

    var scaledWidth = Math.round(size.width * scale);
    var scaledHeight = Math.round(size.height * scale);
    var offsetX = Math.round((size.width - scaledWidth) / 2.0);
    var offsetY = Math.round((size.height - scaledHeight) / 2.0);

    image.destinationX = offsetX;
    image.destinationY = offsetY;
    image.destinationWidth = scaledWidth;
    image.destinationHeight = scaledHeight;

  }, "scale");
};
