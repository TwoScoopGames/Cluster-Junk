"use strict";

var canvas = document.getElementById("canvas");

var Splat = require("splat-ecs");
require("./index.html");


// This is some webpack magic to ensure the dynamically required scripts are loaded

var splatSystemPath = "splat-ecs/lib/systems";
// WARNING: can't use splatSystemPath variable here, or webpack won't pick it up
var splatSystemRequire = require.context("splat-ecs/lib/systems", true, /\.js$/);

var localSystemPath = "./systems";
var localSystemRequire = require.context("./systems", true, /\.js$/);

var localScriptPath = "./scripts";
var localScriptRequire = require.context("./scripts", true, /\.js$/);

function generateManifest(files, folder) {
  return files.reduce(function(manifest, file) {
    var basename = file.substr(2);
    manifest[basename] = folder + "/" + basename;
    return manifest;
  }, {});
}

require.context("./fonts", true, /.*\.(eot|svg|ttf|woff2?)$/i);

var imageContext = require.context("./images", true, /\.(jpe?g|png|gif|svg)$/i);
var imageManifest = generateManifest(imageContext.keys(), "images");

var soundContext = require.context("./sounds", true, /\.(mp3|ogg|wav)$/i);
var soundManifest = generateManifest(soundContext.keys(), "sounds");

var localDataPath = "./data";
var localDataRequire = require.context("./data", true, /\.json$/);

var componentContext = require.context("./components", true, /\.js(on)?$/);
var componentManifest = generateComponentManifest(componentContext);

function generateComponentManifest(context) {
  var files = context.keys();
  return files.reduce(function(manifest, file) {
    var name = snakeToCamelCase(basename(file).substr(2));
    manifest[name] = context(file);
    return manifest;
  }, {});
}

function snakeToCamelCase(str) {
  return str.replace(/-([a-z0-9])/g, function(g) { return g[1].toUpperCase(); });
}

function basename(path) {
  var pos = path.lastIndexOf(".");
  if (pos !== -1) {
    return path.substring(0, pos);
  }
  return path;
}

function customRequire(path) {
  if (path.indexOf(splatSystemPath) === 0) {
    var splatName = "./" + path.substr(splatSystemPath.length + 1) + ".js";
    return splatSystemRequire(splatName);
  }
  if (path.indexOf(localSystemPath) === 0) {
    var localName = "./" + path.substr(localSystemPath.length + 1) + ".js";
    return localSystemRequire(localName);
  }
  if (path.indexOf(localScriptPath) === 0) {
    var scriptName = "./" + path.substr(localScriptPath.length + 1) + ".js";
    return localScriptRequire(scriptName);
  }
  if (path === "./data/components") {
    return componentManifest;
  }
  if (path === "./data/images") {
    return imageManifest;
  }
  if (path === "./data/sounds") {
    return soundManifest;
  }
  if (path.indexOf(localDataPath) === 0) {
    var dataName = "./" + path.substr(localDataPath.length + 1) + ".json";
    return localDataRequire(dataName);
  }
  console.error("Unable to load module: \"", path, "\"");
  return undefined;
}

window.game = new Splat.Game(canvas, customRequire);
window.game.start();
