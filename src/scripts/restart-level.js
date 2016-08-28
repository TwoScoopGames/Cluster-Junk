module.exports = function(entity, game) {
  game.switchScene("level", { level: game.arguments.level });
};
