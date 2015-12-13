"use strict";

function pupilOffset(entity) {
	var px = 0;
	var py = 0;
	if (entity.movement2d.left) {
		px -= 20;
	}
	if (entity.movement2d.right) {
		px += 20;
	}
	if (entity.movement2d.up) {
		py -= 20;
	}
	if (entity.movement2d.down) {
		py += 20;
	}
	return { x: px, y: py };
}

function tween(start, end, pct) {
	pct = pct || 0.1;
	var diff = end - start;
	return start + (diff * pct);
}

var pupilOffsetX = 0;
var pupilOffsetY = 0;

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, context) { // eslint-disable-line no-unused-vars
		var camera = data.entities.entities[1];

		var cx = entity.position.x + entity.size.width / 2;
		var cy = entity.position.y + entity.size.height / 2;

		var cpctx = (cx - camera.position.x) / camera.size.width;
		var x = data.canvas.width * cpctx;
		var cpcty = (cy - camera.position.y) / camera.size.height;
		var y = data.canvas.height * cpcty;

		var eyes = data.images.get("eyes");
		var ex = x - (eyes.width / 2);
		var ey = y - (eyes.height / 2);
		context.drawImage(eyes, ex, ey);

		var pupils = data.images.get("pupils");
		var px = x - (pupils.width / 2);
		var py = y - (pupils.height / 2);

		var po = pupilOffset(entity);
		pupilOffsetX = tween(pupilOffsetX, po.x);
		pupilOffsetY = tween(pupilOffsetY, po.y);
		px += pupilOffsetX;
		py += pupilOffsetY;

		context.drawImage(pupils, px, py);

	}, ["player", "position", "size", "radius"]);
};
