"use strict";

/* TODO: create a real solution: modify Splat to allow
 * callbacks that run after certain points in timer countdown
 */

var tracksToStop = [
  "trash-island-theme.mp3",
  "trash-island-bossa.mp3"
];

var warningDeployed = false;

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function countdownWarning(entity, context, elapsed) { // eslint-disable-line no-unused-vars
    if (warningDeployed) {
      return;
    }
    var goalTimer = game.entities.get(entity, "timers").goalTimer;
    var remainingSeconds = (goalTimer.max - goalTimer.time) / 1000;
    if (remainingSeconds > 10) {
      return;
    }

    // TODO: play warning sound
    var newTrackToStart = null;
    tracksToStop.forEach(function(track) {
      if (game.sounds.looping[track]) {
        newTrackToStart = track.replace(".mp3", "-2x.mp3");
      }
      game.sounds.stop(track);
    });

    /* TODO: delay this sound until warning is elapsed
     * (may require modding Splat)
     */
    if (newTrackToStart === "trash-island-theme-2x.mp3") {
      game.sounds.play("trash-island-theme-2x.mp3", {
        "loopStart": 8.0 / 2,
        "loopEnd": 40.0 / 2
      });
    } else if (newTrackToStart === "trash-island-bossa-2x.mp3") {
      game.sounds.play("trash-island-bossa-2x.mp3", {
        "loopStart": 7.111 / 2,
        "loopEnd": 64.0 / 2
      });
    }

    warningDeployed = true;
  }, "player");
};
