"use strict";

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars
  var camera = game.entities.find("camera")[0];
  game.entities.getComponent(camera, "onButtonPressed").action = "./scripts/go-to-thanks-scene";
};
