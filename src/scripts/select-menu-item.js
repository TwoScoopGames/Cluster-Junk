
module.exports = function(entity, game) {
  var text = game.entities.getComponent(entity, "text");
  text.fillStyle = "red";
};
