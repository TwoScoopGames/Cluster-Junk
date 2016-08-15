"use strict";

module.exports = function(player, data) { // eslint-disable-line no-unused-vars
  data.entities.setComponent(player, "recovering", false);
};
