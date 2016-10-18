module.exports = function(ecs, game) {
  ecs.addEach(function renderGoal(entity) {
    var onScreenJoystick = game.entities.getComponent(entity, "onScreenJoystick");

    if (!onScreenJoystick.pressed) {
      return;
    }

    game.context.lineWidth = 1;
    game.context.strokeStyle = "rgba(228, 227, 158, 0.48)";
    game.context.beginPath();
    game.context.arc(onScreenJoystick.centerX, onScreenJoystick.centerY, onScreenJoystick.radius, 0, Math.PI * 2);
    game.context.stroke();

    game.context.fillStyle = "rgba(106, 189, 68, 0.55)";
    game.context.beginPath();
    game.context.arc(game.inputs.mouse.x, game.inputs.mouse.y, 20, 0, Math.PI * 2);
    game.context.fill();
  }, ["onScreenJoystick"]);
};
