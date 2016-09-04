module.exports = {
  factory: function() {
    return {
      selected: false
    };
  },
  reset: function(menuItem) {
    menuItem.selected = false;
    delete menuItem.selecting;
    delete menuItem.up;
    delete menuItem.down;
    delete menuItem.left;
    delete menuItem.right;
    delete menuItem.onSelect;
    delete menuItem.onDeselect;
    delete menuItem.onActivate;
  }
};
