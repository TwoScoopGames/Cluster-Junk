module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  game.entities.registerSearch("move-to-spinner-search", ["position", "size", "moveToSpinner"]);
  ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
    var moveToSpinner = game.entities.getComponent(entity, "moveToSpinner");
    var position = game.entities.getComponent(entity, "position");
    var size = game.entities.getComponent(entity, "size");

    var spinner = moveToSpinner.id;
    var spinnerPosition = game.entities.getComponent(spinner, "position");
    var spinnerConfig = game.entities.getComponent(spinner, "spinner");

    position.x = spinnerPosition.x - (size.width / 2) + (spinnerConfig.radius * Math.cos(spinnerConfig.angle + moveToSpinner.angle));
    position.y = spinnerPosition.y - (size.height / 2) + (spinnerConfig.radius * Math.sin(spinnerConfig.angle + moveToSpinner.angle));
  }, "move-to-spinner-search");
};
