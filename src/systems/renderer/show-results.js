var moment = require("moment");

var levels = require("../../data/levels.json");
var printed = false;

var dateFormatCache = {};

function isoStringToFormatted(isoString) {
  if (dateFormatCache[isoString]) {
    return dateFormatCache[isoString];
  }

  var formatted = moment(isoString).format("dddd h:mma");
  dateFormatCache[isoString] = formatted;
  return formatted;
}

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function showResults(entity, elapsed) { // eslint-disable-line no-unused-vars
    if (printed) {
      return;
    }
    var levelIndex = game.arguments.level || 0;
    var level = levels[levelIndex];

    var playerRadius = game.entities.getComponent(entity, "radius");
    var goalRadius = level.goalRadius;

    console.log(level.message);
    console.log(playerRadius >= goalRadius ? "You're really big!" : "Not this time...");
    console.log("You grew to " + Math.floor(playerRadius) + "m.");
    console.log("\n");

    var bestTimes = JSON.parse(game.entities.getComponent(entity, "bestTimes"));
    if (bestTimes && bestTimes.length) {
      console.log("BEST TIMES");
      for (var i = 0; i < bestTimes.length; i++) {
        var record = bestTimes[i];
        console.log(
          (record.time / 1000).toFixed(1) + "s" +
          "   " +
          isoStringToFormatted(record.when)
        );
      }
    }
    printed = true;
  }, "hasResults");
};
