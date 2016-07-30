"use strict";

module.exports = function(entity, game) {
  game.entities.get(entity, "animation").name = "box-anim-f11";
  game.entities.set(entity, "eyes", {
    "pupilOffsetX": 0,
    "pupilOffsetY": 0,
    "lidFrame": 0,
    "lidTime": 0
  });
};
