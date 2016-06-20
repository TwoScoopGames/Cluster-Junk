
function percentLoaded(game) {
  if (game.images.totalBytes() + game.sounds.assets.totalBytes() === 0) {
    return 1;
  }
  return (game.images.bytesLoaded() + game.sounds.assets.bytesLoaded()) / (game.images.totalBytes() + game.sounds.assets.totalBytes());
}

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.add(function renderLoadingBar(entity, elapsed) { // eslint-disable-line no-unused-vars
    game.context.fillStyle = "#000000";
    game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

    var quarterWidth = Math.floor(game.canvas.width / 4);
    var halfWidth = Math.floor(game.canvas.width / 2);
    var halfHeight = Math.floor(game.canvas.height / 2);

    game.context.fillStyle = "#ffffff";
    game.context.fillRect(quarterWidth, halfHeight - 15, halfWidth, 30);

    game.context.fillStyle = "#000000";
    game.context.fillRect(quarterWidth + 3, halfHeight - 12, halfWidth - 6, 24);

    var loaded = percentLoaded(game);

    game.context.fillStyle = "#ffffff";
    var barWidth = (halfWidth - 6) * loaded;
    game.context.fillRect(quarterWidth + 3, halfHeight - 12, barWidth, 24);

    if (loaded === 1) {
      game.switchScene("title");
    }
  });
};
