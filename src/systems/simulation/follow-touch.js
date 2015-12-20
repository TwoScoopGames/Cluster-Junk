"use strict";

module.exports = function(ecs, data) {
	window.mouse = data.input.getMouse();
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var touches = data.input.getMouse().touches;
		var entityPosition = entity.position;
		Object.keys(entity.touchFollowBounds).forEach(function(key) {
			var bounds = entity.touchFollowBounds[key];
			var xMin = !isNaN(bounds.xMin) ? bounds.xMin + entityPosition.x : null;
			var xMax = !isNaN(bounds.xMax) ? bounds.xMax + entityPosition.x : null;
			var yMin = !isNaN(bounds.yMin) ? bounds.yMin + entityPosition.y : null;
			var yMax = !isNaN(bounds.yMax) ? bounds.yMax + entityPosition.y : null;
			touches.forEach(function(point) {
				if ((!xMin || point.x >= xMin) && (!xMax || point.x <= xMax) &&
						(!yMin || point.y >= yMin) && (!yMax || point.y <= yMax)) {
					entity.movement2d[key] = true;
					console.log(key);
					console.log("bounds:", bounds);
					console.log(xMin, xMax, yMin, yMax);
					console.log(point);
					console.log(entityPosition);
				}
			});
		});
	}, ["movement2d", "touchFollowBounds"]);
};
