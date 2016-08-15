
module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function onPositionLeftOf(entity, elapsed) { // eslint-disable-line no-unused-vars
    var position = game.entities.getComponent(entity, "position");
    var leftOf = game.entities.getComponent(entity, "onPositionLeftOf");

    if (position.x < leftOf.x) {
      var script = game.require(leftOf.script);
      script(entity, game);
    }

  }, "onPositionLeftOf");
};
