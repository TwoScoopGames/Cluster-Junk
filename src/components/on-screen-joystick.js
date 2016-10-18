module.exports = {
  factory: function() {
    return {
      centerX: 0,
      centerY: 0,
      pressed: false,
      radius: 100,
      xAxis: undefined,
      yAxis: undefined
    };
  },
  reset: function(onScreenJoystick) {
    onScreenJoystick.centerX = 0;
    onScreenJoystick.centerY = 0;
    onScreenJoystick.pressed = false;
    onScreenJoystick.radius = 100;
    delete onScreenJoystick.xAxis;
    delete onScreenJoystick.yAxis;
  }
};
