"use strict";

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars
  game.switchScene("level", { level: game.entities.getComponent(entity, "level") });
};
