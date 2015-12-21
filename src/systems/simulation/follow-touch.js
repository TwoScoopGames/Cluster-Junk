"use strict";

module.exports = function(ecs, data) {
	data.entities.registerSearch("followTouch", ["movement2d", "touchFollowBounds"]);
	ecs.addEach(function followTouch(entity, elapsed) { // eslint-disable-line no-unused-vars
		var cameraPosition = data.entities.get(1, "position");
		var entityScale = data.entities.get(entity, "scale") || 1;
		var touchPoints = data.input.mouse.touches.map(function(touch) {
			return {
				"x": touch.x / entityScale + cameraPosition.x,
				"y": touch.y / entityScale + cameraPosition.y
			};
		});
		var entityPosition = data.entities.get(entity, "position");
		var entitySize = data.entities.get(entity, "size");
		var entityCenter = {
			"x": entityPosition.x + entitySize.width / 2,
			"y": entityPosition.y + entitySize.height / 2
		};
		var touchFollowBounds = data.entities.get(entity, "touchFollowBounds");
		Object.keys(touchFollowBounds).forEach(function(key) {
			var bounds = touchFollowBounds[key];
			var xMin = !isNaN(bounds.xMin) ? bounds.xMin / entityScale + entityCenter.x : null;
			var xMax = !isNaN(bounds.xMax) ? bounds.xMax / entityScale + entityCenter.x : null;
			var yMin = !isNaN(bounds.yMin) ? bounds.yMin / entityScale + entityCenter.y : null;
			var yMax = !isNaN(bounds.yMax) ? bounds.yMax / entityScale + entityCenter.y : null;
			touchPoints.forEach(function(point) {
				if ((!xMin || point.x >= xMin) && (!xMax || point.x <= xMax) &&
						(!yMin || point.y >= yMin) && (!yMax || point.y <= yMax)) {
					data.entities.get(entity, "movement2d")[key] = true;
				}
			});
		});
	}, "followTouch");
};
