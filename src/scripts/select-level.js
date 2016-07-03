"use strict";

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars
  game.switchScene("level", { level: game.entities.get(entity, "level") });
};
