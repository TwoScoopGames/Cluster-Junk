"use strict";

module.exports = function(canvas, context, text, offsetX, offsetY) {
  var w = context.measureText(text).width;
  var x = offsetX + (canvas.width / 2) - (w / 2) | 0;
  var y = offsetY | 0;
  context.fillText(text, x, y);
};
