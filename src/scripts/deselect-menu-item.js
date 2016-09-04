
module.exports = function(entity, game) {
  var text = game.entities.getComponent(entity, "text");
  delete text.fillStyle;
};
