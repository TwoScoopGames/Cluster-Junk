var browserify = require("browserify");
var fs = require("fs");
var mkdirp = require("mkdirp");
var ncp = require("ncp").ncp;
var path = require("path");

var b = browserify();
b.add("./src/game.js");

function srcPath(gamePath) {
	// return gamePath;
	return "." + path.sep + path.join("src", gamePath);
}

var scripts = require("./src/data/scripts");
scripts.forEach(function(script) {
	b.require(srcPath(script), { expose: script });
});

var systems = require("./src/data/systems");
systems.simulation.forEach(function(system) {
	if (system.name.indexOf("splatjs:") === 0) {
		return;
	}
	b.require(srcPath(system.name), { expose: system.name });
});
systems.renderer.forEach(function(system) {
	if (system.name.indexOf("splatjs:") === 0) {
		return;
	}
	b.require(srcPath(system.name), { expose: system.name });
});

mkdirp.sync("build");
var out = fs.createWriteStream("./build/index.js");
b.bundle().pipe(out);

ncp("src/index.html", "build/index.html");
ncp("src/android-icon-144x144.png", "build/android-icon-144x144.png");
ncp("src/android-icon-192x192.png", "build/android-icon-192x192.png");
ncp("src/android-icon-36x36.png", "build/android-icon-36x36.png");
ncp("src/android-icon-48x48.png", "build/android-icon-48x48.png");
ncp("src/android-icon-72x72.png", "build/android-icon-72x72.png");
ncp("src/android-icon-96x96.png", "build/android-icon-96x96.png");
ncp("src/apple-icon-114x114.png", "build/apple-icon-114x114.png");
ncp("src/apple-icon-120x120.png", "build/apple-icon-120x120.png");
ncp("src/apple-icon-144x144.png", "build/apple-icon-144x144.png");
ncp("src/apple-icon-152x152.png", "build/apple-icon-152x152.png");
ncp("src/apple-icon-180x180.png", "build/apple-icon-180x180.png");
ncp("src/apple-icon-57x57.png", "build/apple-icon-57x57.png");
ncp("src/apple-icon-60x60.png", "build/apple-icon-60x60.png");
ncp("src/apple-icon-72x72.png", "build/apple-icon-72x72.png");
ncp("src/apple-icon-76x76.png", "build/pple-icon-76x76.png");
ncp("src/apple-icon-precomposed.png", "build/pple-icon-precomposed.png");
ncp("src/apple-icon.png", "build/apple-icon.png");
ncp("src/browserconfig.xml", "build/browserconfig.xml");
ncp("src/favicon-16x16.png", "build/favicon-16x16.png");
ncp("src/favicon-32x32.png", "build/favicon-32x32.png");
ncp("src/favicon-96x96.png", "build/favicon-96x96.png");
ncp("src/favicon.ico", "build/favicon.ico");
ncp("src/manifest.json", "build/manifest.json");
ncp("src/ms-icon-144x144.png", "build/ms-icon-144x144.png");
ncp("src/ms-icon-150x150.png", "build/ms-icon-150x150.png");
ncp("src/ms-icon-310x310.png", "build/ms-icon-310x310.png");
ncp("src/ms-icon-70x70.png", "build/s-icon-70x70.png");
ncp("src/images", "build/images");
ncp("src/sounds", "build/sounds");
ncp("src/fonts", "build/fonts");
