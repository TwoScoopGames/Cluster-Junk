module.exports = {
  factory: function() {
    return {};
  },
  reset: function(component) {
    var buttons = Object.keys(component);
    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      delete component[button];
    }
  }
};
