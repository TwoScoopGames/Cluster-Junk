var accumulatedFrames = 0;
var accumulatedTime = 0;

var bars = [];
for (var i = 0; i < 120; i++) {
  bars.push(0);
}

module.exports = function(ecs, game) {
  ecs.add(function frameRateGraph(entities, elapsed) { // eslint-disable-line no-unused-vars
    accumulatedFrames++;
    accumulatedTime += elapsed;

    if (accumulatedTime > 100) {
      var averageTime = accumulatedTime / accumulatedFrames;
      var fps = Math.floor(1000 / averageTime);

      addBar(bars, fps);
      accumulatedFrames = 0;
      accumulatedTime = 0;
    }

    drawBars(game.context, bars, game.canvas.width - bars.length - 2, 0);
  });
};

function addBar(array, value) {
  for (var i = 0; i < array.length - 1; i++) {
    array[i] = array[i + 1];
  }
  array[i] = value;
}


var red = "rgba(255, 72, 72, 0.7)";
var yellow = "rgba(253, 250, 60, 0.7)";
var green = "rgba(56, 248, 42, 0.7)";

function drawBars(context, bars, x, y) {
  drawGrid(context, x, y, bars.length + 2, 62);

  context.lineWidth = 1;

  for (var i = 0; i < bars.length; i++) {
    var bx = Math.floor(x) + i + 1;
    var by = y + 61;
    var height = Math.min(bars[i], 60);

    if (height > 40) {
      context.strokeStyle = green;
    } else if (height > 20) {
      context.strokeStyle = yellow;
    } else {
      context.strokeStyle = red;
    }
    context.beginPath();
    context.moveTo(bx, by);
    context.lineTo(bx, by - height);
    context.stroke();
  }
}

function drawGrid(context, x, y, width, height) {
  context.strokeStyle = "#ffffff";
  context.lineWidth = 1;
  context.strokeRect(x, y, width, height);

  for (var j = 0; j < height; j += 10) {
    context.beginPath();
    context.moveTo(x, y + j + 1);
    context.lineTo(x + width, y + j + 1);
    context.stroke();
  }
}
