module.exports = function(ecs, game) {
  ecs.addEach(function(entity) {
    var menuItem = game.entities.getComponent(entity, "menuItem");
    if (menuItem.selecting && game.inputs.buttonReleased(menuItem.selecting)) {
      delete menuItem.selecting;
      menuItem.selected = true;
    }
    if (!menuItem.selected) {
      return;
    }

    var buttons = ["up", "down", "left", "right"];
    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      if (menuItem[button] && game.inputs.buttonPressed(button)) {
        selectMenuItem(game, entity, menuItem, button);
        break;
      }
    }
    if (menuItem.onActivate && game.inputs.buttonPressed("action")) {
      var activate = game.require(menuItem.onActivate);
      activate(entity, game);
    }

  }, "menuItem");
};

function selectMenuItem(game, source, menuItem, button) {
  var target = menuItem[button];
  var targetMenuItem = game.entities.getComponent(target, "menuItem");
  if (!targetMenuItem) {
    return;
  }
  menuItem.selected = false;
  targetMenuItem.selecting = button;
  if (menuItem.onDeselect) {
    var deselect = game.require(menuItem.onDeselect);
    deselect(source, game);
  }
  if (targetMenuItem.onSelect) {
    var select = game.require(targetMenuItem.onSelect);
    select(target, game);
  }
}
