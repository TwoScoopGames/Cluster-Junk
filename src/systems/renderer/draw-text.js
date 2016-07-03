"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
    var position = game.entities.get(entity, "position");
    var size = game.entities.get(entity, "size");
    var text = game.entities.get(entity, "text");
    var textWidth = game.context.measureText(text.text).width;

    game.context.fillStyle = text.fillStyle || "black";
    game.context.font = text.font || "100px blanch";
    game.context.textBaseline = "middle";
    game.context.fillText(text.text, position.x + Math.floor(size.width / 2) - Math.floor(textWidth / 2), position.y + Math.floor(size.height / 2));
  }, "text");
};
