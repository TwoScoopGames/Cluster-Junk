"use strict";

function drawEntity(context, images, entity) {
	var dx = entity.image.destinationX + entity.position.x;
	var dy = entity.image.destinationY + entity.position.y;

	var image = images.get(entity.image.name);
	if (!image) {
		return;
	}

	if (entity.rotation !== undefined) {
		context.save();

		var x = entity.position.x + entity.rotation.x;
		var y = entity.position.y + entity.rotation.y;
		context.translate(x, y);
		context.rotate(entity.rotation.angle);

		dx = entity.image.destinationX - entity.rotation.x;
		dy = entity.image.destinationY - entity.rotation.y;
	}


	context.drawImage(
		image,
		entity.image.sourceX,
		entity.image.sourceY,
		entity.image.sourceWidth,
		entity.image.sourceHeight,
		dx,
		dy,
		entity.image.destinationWidth,
		entity.image.destinationHeight
	);

	if (entity.rotation !== undefined) {
		context.restore();
	}
}

module.exports = function(ecs, data) {
	ecs.add(function(entities, context) {
		var toDraw = Object.keys(entities).reduce(function(list, id) {
			var entity = entities[id];
			if (entity.position !== undefined && entity.image !== undefined) { // requirements
				list.push(entity);
			}
			return list;
		}, []);

		toDraw.sort(function(a, b) {
			return a.position.y - b.position.y;
		});

		toDraw.forEach(drawEntity.bind(undefined, context, data.images));
	});
};
