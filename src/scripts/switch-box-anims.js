"use strict";

module.exports = function(entity, game) {
  console.log("switching");
  game.entities.get(entity, "animation").name = "box-anim-f11";
};
