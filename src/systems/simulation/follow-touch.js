"use strict";

module.exports = function(ecs, data) {
	data.entities.registerSearch("followTouch", ["movement2d", "touchFollowBounds"]);
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var cameraPosition = data.entities.get(1, "position");
		var touchPoints = data.input.mouse.touches.map(function(touch) {
			return {
				"x": touch.x + cameraPosition.x,
				"y": touch.y + cameraPosition.y
			};
		});
		var entityPosition = data.entities.get(entity, "position");
		var touchFollowBounds = data.entities.get(entity, "touchFollowBounds");
		Object.keys(touchFollowBounds).forEach(function(key) {
			var bounds = touchFollowBounds[key];
			var xMin = !isNaN(bounds.xMin) ? bounds.xMin + entityPosition.x : null;
			var xMax = !isNaN(bounds.xMax) ? bounds.xMax + entityPosition.x : null;
			var yMin = !isNaN(bounds.yMin) ? bounds.yMin + entityPosition.y : null;
			var yMax = !isNaN(bounds.yMax) ? bounds.yMax + entityPosition.y : null;
			touchPoints.forEach(function(point) {
				if ((!xMin || point.x >= xMin) && (!xMax || point.x <= xMax) &&
						(!yMin || point.y >= yMin) && (!yMax || point.y <= yMax)) {
					data.entities.get(entity, "movement2d")[key] = true;
				}
			});
		});
	}, "followTouch");
};
