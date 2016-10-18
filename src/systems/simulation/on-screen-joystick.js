module.exports = function(ecs, game) {
  game.entities.registerSearch("on-screen-joystick", ["onScreenJoystick", "position", "size"]);
  ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
    var onScreenJoystick = game.entities.getComponent(entity, "onScreenJoystick");
    var position = game.entities.getComponent(entity, "position");
    var size = game.entities.getComponent(entity, "size");

    var mx = game.inputs.mouse.x;
    var my = game.inputs.mouse.y;

    if (mx < position.x
        || mx > position.x + size.width
        || my < position.y
        || my > position.y + size.height) {
      return;
    }

    if (game.inputs.button("action")) {
      if (onScreenJoystick.pressed) {
        var dx = mx - onScreenJoystick.centerX;
        var dy = my - onScreenJoystick.centerY;
        var dist = Math.sqrt((dx * dx) + (dy * dy));
        var angle = Math.atan2(dy, dx);
        if (dist > onScreenJoystick.radius) {
          var toMove = dist - onScreenJoystick.radius;
          onScreenJoystick.centerX += toMove * Math.cos(angle);
          onScreenJoystick.centerY += toMove * Math.sin(angle);
          dist = onScreenJoystick.radius;
        }
        dist /= onScreenJoystick.radius;
        var x = dist * Math.cos(angle);
        var y = dist * Math.sin(angle);
        game.inputs.setAxis(onScreenJoystick.xAxis, entity, x);
        game.inputs.setAxis(onScreenJoystick.yAxis, entity, y);
      } else {
        onScreenJoystick.pressed = true;
        onScreenJoystick.centerX = mx;
        onScreenJoystick.centerY = my;
      }
    } else {
      onScreenJoystick.pressed = false;
      game.inputs.setAxis(onScreenJoystick.xAxis, entity, 0);
      game.inputs.setAxis(onScreenJoystick.yAxis, entity, 0);
    }
  }, "on-screen-joystick");
};
