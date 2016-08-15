module.exports = {
  factory: function() {
    return {
      text: ""
    };
  },
  reset: function(text) {
    text.text = "";
    delete text.fillStyle;
    delete text.font;
  }
};
