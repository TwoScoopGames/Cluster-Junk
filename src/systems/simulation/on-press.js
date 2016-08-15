"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  game.entities.registerSearch("apply-on-press", ["onPress", "position", "size"]);
  ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
    var camera = game.entities.find("camera")[0];
    var cameraPosition = game.entities.getComponent(camera, "position");

    var position = game.entities.getComponent(entity, "position");
    var size = game.entities.getComponent(entity, "size");
    var mx = game.inputs.mouse.x + cameraPosition.x;
    var my = game.inputs.mouse.y + cameraPosition.y;
    if (game.inputs.buttonPressed("action")
        && mx >= position.x
        && mx < position.x + size.width
        && my >= position.y
        && my < position.y + size.height
        ) {
      var onPress = game.entities.getComponent(entity, "onPress");
      var script = game.require(onPress.script);
      script(entity, game);
    }
  }, "apply-on-press");
};
