"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(title, elapsed) { // eslint-disable-line no-unused-vars
		data.sounds.play("ambient-sea-track", {
			"loopStart": 0,
			"loopEnd": 0
		});
		if (data.input.button("action")) {
			title.action = true;
		} else {
			if (title.action) {
				data.switchScene("main");
			}
			title.action = false;
		}
	}, ["title"]);
};
