var saveData = require("splat-ecs/lib/save-data");
var moment = require("moment");

var levels = require("../../data/levels.json");

var dateFormatCache = {};

var blinkPlayerTime = false;
setInterval(function togglePlayerTimeBlink(){
  blinkPlayerTime = !blinkPlayerTime;
}, 500);

function drawText(text, fontSize, y, lineWidth, canvas, context) {
  context.fillStyle = "#3e311a";
  context.strokeStyle = "#ffffff";
  context.lineWidth = lineWidth;
  context.font = fontSize + "px blanch";
  var w = context.measureText(text).width;
  var x = (canvas.width / 2) - (w / 2) | 0;
  context.strokeText(text, x, y);
  context.fillText(text, x, y);
}

function isoStringToFormatted(isoString) {
  if (dateFormatCache[isoString]) {
    return dateFormatCache[isoString];
  }

  var formatted = moment(isoString).format("dddd h:mma");
  dateFormatCache[isoString] = formatted;
  return formatted;
}

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  var renderedBestTimes = null;

  function getRenderedBestTimes(entity, callback) {
    var levelIndex = game.arguments.level || 0;
    var storageKey = "scores-" + levelIndex;
    saveData.get(storageKey, function renderBestTimes(err, data) {
      if (err || !data[storageKey]) {
        return callback(entity);
      }
      var bestTimes = JSON.parse(data[storageKey]);
      if (!bestTimes || !bestTimes.length) {
        return callback(entity);
      }
      renderedBestTimes = [];
      var longestRowLength = 0;
      // turn each record into a formatted string
      var i;
      for (i = 0; i < bestTimes.length; i++) {
        var record = bestTimes[i];
        renderedBestTimes[i] = (
          (record.time / 1000).toFixed(1) + "s" +
          "     " +
          isoStringToFormatted(record.when) +
          "\n"
        );
        longestRowLength = Math.max(longestRowLength, renderedBestTimes[i].length);
      }
      // do another pass to make sure each row is the same length
      for (i = 0; i < renderedBestTimes.length; i++) {
        while (renderedBestTimes[i].length < longestRowLength) {
          var spaceIndex = renderedBestTimes[i].indexOf(" ");
          renderedBestTimes[i] = (
            renderedBestTimes[i].slice(0, spaceIndex) +
            " " +
            renderedBestTimes[i].slice(spaceIndex)
          );
        }
      }
      callback(entity);
    });
  }

  function renderResults(entity) {
    var levelIndex = game.arguments.level || 0;
    var level = levels[levelIndex];

    var playerRadius = game.entities.getComponent(entity, "radius");
    var goalRadius = level.goalRadius;
    var statusMessage = playerRadius >= goalRadius ? "You're really big!" : "Not this time...";
    statusMessage += " (" + Math.floor(playerRadius) + "m)";
    var successTime = game.entities.getComponent(entity, "successTime");
    var successTimeMessage = successTime && "Goal reached at " + (successTime / 1000).toFixed(1) + "s";

    var canvas = game.canvas;
    var context = game.context;
    var camera = game.entities.find("camera")[0];
    var cameraHeight = game.entities.getComponent(camera, "size").height;

    var drawY = 200;

    drawText(level.message, 100, drawY, 10, canvas, context);
    drawY += 100 /* * canvas.height / cameraHeight*/;

    drawText(statusMessage, 60, drawY, 6, canvas, context);
    drawY += 60 /* * canvas.height / cameraHeight*/;

    if (successTimeMessage) {
      drawText(successTimeMessage, 60, drawY, 6, canvas, context);
      drawY += 60 /* * canvas.height / cameraHeight*/;
    }

    drawY += 15 /* * canvas.height / cameraHeight*/;

    drawText("Best Times", 60, drawY, 6, canvas, context);
    drawY += 60 /* * canvas.height / cameraHeight*/;

    var playerTimeFound = false;
    for (var i = 0; renderedBestTimes && drawY <= canvas.height && i < renderedBestTimes.length; i++) {
      var record = renderedBestTimes[i];
      if (
        successTime &&
        blinkPlayerTime &&
        !playerTimeFound &&
        record.indexOf((successTime / 1000).toFixed(1)) === 0
      ) {
        playerTimeFound = true;
      } else {
        drawText(renderedBestTimes[i], 50, drawY, 5, canvas, context);
      }
      drawY += 50 /* * canvas.height / cameraHeight*/;
    }
  }

  ecs.addEach(function showResults(entity, elapsed) { // eslint-disable-line no-unused-vars
    if (!renderedBestTimes || !renderedBestTimes.length) {
      return getRenderedBestTimes(entity, renderResults);
    }
    renderResults(entity);
  }, "showResults");
};
