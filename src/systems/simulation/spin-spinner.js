module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
    var spinner = game.entities.getComponent(entity, "spinner");
    var oneRpm = 2 * Math.PI / 1000;
    spinner.angle += oneRpm * spinner.speed * elapsed;
  }, "spinner");
};

