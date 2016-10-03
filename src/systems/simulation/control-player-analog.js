module.exports = function(ecs, game) {
  game.entities.registerSearch("controlPlayerAnalog", ["movement2dAnalog", "playerController2dAnalog"]);
  ecs.addEach(function controlPlayerAnalog(entity) {
    var movement2dAnalog = game.entities.getComponent(entity, "movement2dAnalog");
    var playerController2dAnalog = game.entities.getComponent(entity, "playerController2dAnalog");

    var x = game.inputs.axis(playerController2dAnalog.x);
    var y = game.inputs.axis(playerController2dAnalog.y);
    movement2dAnalog.angle = Math.atan2(y, x);
    movement2dAnalog.magnitude = Math.sqrt((x * x) + (y * y));
  }, "controlPlayerAnalog");
};
