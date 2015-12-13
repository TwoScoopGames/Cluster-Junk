"use strict";

function getCamera(entities) {
	return entities[1];
}

function getScreenTopLeft(camera) {
	if (camera === undefined) {
		return { x: 0, y: 0 };
	}
	var x = camera.position.x + camera.camera.x;
	var y = camera.position.y + camera.camera.y;
	return { x: x, y: y };
}

var time = 0;
var rowHeight = 60;
var waveHeight = 20;
var wavePeriod = 4000;
var rowsBeforeRepeat = 8;
var rowsOffset = Math.PI * 2 / rowsBeforeRepeat;

module.exports = function(ecs, data) { // jshint ignore:line
	ecs.add(function(entities, context, elapsed) { // jshint ignore:line
		var camera = getCamera(data.entities.entities);
		context.fillStyle = "#1c325f";
		context.fillRect(Math.floor(camera.position.x), Math.floor(camera.position.y), camera.size.width, camera.size.height);

		time += elapsed;

		var f1 = data.images.get("waves");

		var screen = getScreenTopLeft(camera);
		var startX = Math.floor(screen.x / f1.width) * f1.width;
		var startRow = Math.floor(screen.y / rowHeight);
		var startY = (startRow - 1) * rowHeight;

		for (var y = startY; y <= screen.y + camera.size.height; y += rowHeight) {
			var even = Math.floor(y / rowHeight) % 2;
			var offset = y / rowHeight % rowsBeforeRepeat * rowsOffset;
			var waveY = y + Math.sin(time / wavePeriod * Math.PI * 2 + offset) * waveHeight;

			for (var x = startX; x <= screen.x + camera.size.width + f1.width; x += f1.width) {
				var waveX = x + Math.sin(time / wavePeriod * 2 * Math.PI * 2 + offset) * waveHeight / 2;
				context.drawImage(f1, even ? waveX : waveX - 100, waveY, f1.width, f1.height);
			}
		}
	});
};
