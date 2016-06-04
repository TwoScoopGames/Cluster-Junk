"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function renderFinishedScreen(entity, elapsed) { // eslint-disable-line no-unused-vars
    var replayScreen = game.images.get("replay.png");
    game.context.drawImage(replayScreen, 0, 0);
  }, "title");
};
