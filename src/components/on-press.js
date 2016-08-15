module.exports = {
  factory: function() {
    return {};
  },
  reset: function(onPress) {
    delete onPress.script;
  }
};
