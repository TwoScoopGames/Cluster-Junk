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
        var dist = Math.sqrt((dx * dx) + (dy + dy)) / onScreenJoystick.radius;
        var angle = Math.atan2(dy, dx);
        var x = dist * Math.cos(angle);
        var y = dist * Math.sin(angle);
        // FIXME: move joystick if outside the radius
        // console.log("setAxis(" + onScreenJoystick.xAxis + ", " + x + ")");
        // console.log("setAxis(" + onScreenJoystick.yAxis + ", " + y + ")");
      } else {
        onScreenJoystick.pressed = true;
        onScreenJoystick.centerX = mx;
        onScreenJoystick.centerY = my;
      }
    } else {
      onScreenJoystick.pressed = false;
      // console.log("setAxis(" + onScreenJoystick.xAxis + ", 0)");
      // console.log("setAxis(" + onScreenJoystick.yAxis + ", 0)");
    }
  }, "on-screen-joystick");
};
