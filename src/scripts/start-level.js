
var songs = {
  "trash-island-theme.mp3": {
    "loopStart": 8.0,
    "loopEnd": 40.0
  },
  "trash-island-bossa.mp3": {
    "loopStart": 7.111,
    "loopEnd": 64.0
  }
};

var levels = require("../data/levels.json");

module.exports = function(entity, game) {
  var timers = game.entities.getComponent(entity, "timers");

  timers.goalTimer.running = true;
  var levelData = levels[game.arguments.level || 0];
  game.sounds.play(levelData.music, {
    "loopStart": songs[levelData.music].loopStart,
    "loopEnd": songs[levelData.music].loopEnd
  });
};
