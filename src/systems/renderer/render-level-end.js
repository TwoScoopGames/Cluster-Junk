
module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  game.entities.registerSearch("renderLevelEndSearch", ["gameOver", "goalRadius", "radius", "timers"]);
  ecs.addEach(function renderLevelEnd(entity, elapsed) { // eslint-disable-line no-unused-vars
    var timers = game.entities.getComponent(entity, "timers");
    if (timers.endOfGameTimer.running) {
      return;
    }

    var radius = game.entities.getComponent(entity, "radius");
    var goalRadius = game.entities.getComponent(entity, "goalRadius");
    var won = radius >= goalRadius;

    var rope = game.images.get("rope-tall.png");
    game.context.drawImage(rope, 361, 0);
    game.context.drawImage(rope, 752, 0);

    var buttonBackground = game.images.get("btn-background.png");
    game.context.drawImage(buttonBackground, 264, 320);

    var buttonBlue = game.images.get("btn-blue.png");
    var buttonGreen = game.images.get("btn-green.png");
    var buttonGrey = game.images.get("btn-grey.png");
    game.context.drawImage(buttonBlue, 310, 361);
    game.context.drawImage(won ? buttonBlue : buttonGreen, 505, 361);
    game.context.drawImage(won ? buttonGreen : buttonGrey, 696, 361);

    drawClickableImage(game, "btn-level-select.png", 310, 361, function() {
      game.switchScene("level-select");
    });
    drawClickableImage(game, "btn-retry-level.png", 505, 361, function() {
      game.switchScene("level", { level: game.arguments.level });
    });
    drawClickableImage(game, "btn-next-level.png", 696, 361, function() {
      if (won) {
        var numLevels = require("../../data/levels.json").length;
        var level = game.arguments.level || 0;
        level++;
        if (game.arguments.level + 1 === numLevels) {
          game.switchScene("finished");
        } else {
          game.switchScene("level", { level: level });
        }
      }
    });

    var scoreBackground = game.images.get("score-background.png");
    game.context.drawImage(scoreBackground, 264, 60);
    var stars = [
      game.images.get("score-stars-0.png"),
      game.images.get("score-stars-1.png"),
      game.images.get("score-stars-2.png"),
      game.images.get("score-stars-3.png")
    ];
    var words = [
      "Too bad!",
      "Passable",
      "Good job!",
      "Great!"
    ];
    var score = won ? 3 : 0;
    game.context.drawImage(stars[score], 264, 60);

    game.context.fillStyle = "black";
    game.context.font = "54px blanch";
    game.context.fillText(words[score], 334, 150);

    var notice = game.entities.find("notice")[0];
    if (notice) {
      game.entities.destroy(notice);
    }
  }, "gameOver");
};

function drawClickableImage(game, image, x, y, fn) {
  var mx = game.inputs.mouse.x;
  var my = game.inputs.mouse.y;
  var img = game.images.get(image);
  game.context.drawImage(img, x, y);
  if (game.inputs.buttonPressed("action") &&
      mx > x &&
      mx < x + img.width &&
      my > y &&
      my < y + img.height) {
    fn();
  }
}

