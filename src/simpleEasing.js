"use strict";

module.exports = function simpleEasing(start, end, speed){
	return (end - start) * speed;
};
