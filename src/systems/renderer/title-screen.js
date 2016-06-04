"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function renderTitleScreen(entity, elapsed) { // eslint-disable-line no-unused-vars
    var titleScreen = game.images.get("titleScreen.png");
    game.context.drawImage(titleScreen, 0, 0);
  }, "title");
};
