
module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function rotateAroundCenter(entity, elapsed) { // eslint-disable-line no-unused-vars

    var rotation = game.entities.getComponent(entity, "rotation");
    var speed = game.entities.getComponent(entity, "rotateAroundCenter").speed;
    rotation.angle += elapsed / speed;


  }, "rotateAroundCenter");
};
