"use strict";

module.exports = function(game) { // eslint-disable-line no-unused-vars
  // HACK
  if (game.inputs.gamepads.length) {
    game.inputs.gamepads[0].threshold = 0.20;
  }
};
