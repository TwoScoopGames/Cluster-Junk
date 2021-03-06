"use strict";

module.exports = function(entity, data) { // eslint-disable-line no-unused-vars
  var radius = data.entities.getComponent(entity, "radius");
  var goalRadius = data.entities.getComponent(entity, "goalRadius");
  if (radius >= goalRadius) {
    data.sounds.play("trash-island-victory.mp3");
  } else {
    data.sounds.play("trash-island-failure.mp3");
  }
  data.entities.setComponent(entity, "showResults", true);
  data.entities.getComponent(entity, "timers").continuePastResultsTimer.running = true;
  // add on screen time's up message with failure/victory
};
