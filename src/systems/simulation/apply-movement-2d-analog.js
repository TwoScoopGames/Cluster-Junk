module.exports = function(ecs, game) {
  game.entities.registerSearch("applyMovement2dAnalog", ["velocity", "movement2dAnalog"]);
  // game.entities.registerSearch("applyMovement2dAnalog", ["acceleration", "movement2dAnalog"]);
  ecs.addEach(function applyMovement2dAnalog(entity) {
    var velocity = game.entities.getComponent(entity, "velocity");
    // var acceleration = game.entities.getComponent(entity, "acceleration");
    var movement2dAnalog = game.entities.getComponent(entity, "movement2dAnalog");

    velocity.x = movement2dAnalog.magnitude * movement2dAnalog.max * Math.cos(movement2dAnalog.angle);
    velocity.y = movement2dAnalog.magnitude * movement2dAnalog.max * Math.sin(movement2dAnalog.angle);
    // acceleration.x = movement2dAnalog.magnitude * movement2dAnalog.max * Math.cos(movement2dAnalog.angle);
    // acceleration.y = movement2dAnalog.magnitude * movement2dAnalog.max * Math.sin(movement2dAnalog.angle);
  }, "applyMovement2dAnalog");
};
