"use strict";

module.exports = function(player, data) { // eslint-disable-line no-unused-vars
  data.entities.set(player, "recovering", false);
};
