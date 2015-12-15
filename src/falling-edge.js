"use strict";

module.exports = function fallingEdge(fn) {
	var val = false;
	return function() {
		var oldVal = val;
		val = fn.apply(this, arguments);
		return !val && oldVal;
	};
};
