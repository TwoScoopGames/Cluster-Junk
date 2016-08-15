"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function drawText(entity, elapsed) { // eslint-disable-line no-unused-vars
    var position = game.entities.getComponent(entity, "position");
    var size = game.entities.getComponent(entity, "size");
    var text = game.entities.getComponent(entity, "text");
    var textWidth = game.context.measureText(text.text).width;

    game.context.fillStyle = text.fillStyle || "black";
    game.context.font = text.font || "100px blanch";
    game.context.textBaseline = "middle";
    game.context.fillText(text.text, position.x + Math.floor(size.width / 2) - Math.floor(textWidth / 2), position.y + Math.floor(size.height / 2));
  }, "text");
};
