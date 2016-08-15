"use strict";

module.exports = function(entity, data) { // eslint-disable-line no-unused-vars
  // create notice entity
  var notice = 2;
  data.entities.setComponent(notice, "message", "notice from timer.");
  //timer expires
  //delete notice entity
  //stop timer
};
