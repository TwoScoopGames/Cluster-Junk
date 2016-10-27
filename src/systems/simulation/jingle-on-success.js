"use strict";

var saveData = require("splat-ecs/lib/save-data");

function registerNewTime(time, level) {
  var when = new Date().toISOString();
  var storageKey = "scores-" + level;
  saveData.get(storageKey, function computeNewBestTimes(err, data) {
    if (err) {
      return console.error(err);
    }
    var bestTimes = data[storageKey] ? JSON.parse(data[storageKey]) : [];
    bestTimes.push({
      time: time,
      when: when
    });
    var newData = {};
    var newBestTimes = JSON.stringify(
      // sort list by best times, then chop down to 10
      bestTimes.sort(function compareTimes(a, b) {
        return a.time - b.time;
      }).slice(0, 10)
    );
    newData[storageKey] = newBestTimes;
    saveData.set(newData, function updateBestTimes(err) {
      if (err) {
        console.error(err);
      }
    });
  });
}

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function jingleOnSuccess(entity, context, elapsed) { // eslint-disable-line no-unused-vars
    if (!game.entities.getComponent(entity, "success") && game.entities.getComponent(entity, "radius") >= game.entities.getComponent(entity, "goalRadius")) {
      game.entities.setComponent(entity, "success", true);
      game.sounds.play("trash-island-success.mp3");

      var time = game.entities.getComponent(entity, "timers").goalTimer.time;
      registerNewTime(time, game.arguments.level || 0);
      game.entities.setComponent(entity, "successTime", time);
    }
  }, "player");
};
