module.exports = function(ecs, game) {
  ecs.addEach(function onButtonPressed(entity) {
    var component = game.entities.getComponent(entity, "onButtonPressed");
    var buttons = Object.keys(component);
    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      if (game.inputs.buttonPressed(button)) {
        var script = game.require(component[button]);
        script(entity, game);
      }
    }
  }, "onButtonPressed");
};
