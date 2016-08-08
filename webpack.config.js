var webpack = require("webpack");
var path = require("path");

/* eslint-disable no-undef */
var environment = process.env["NODE_ENV"] || "development";

var soundPath = pathForRegexp("src/sounds");
var soundRegExp = new RegExp(soundPath + ".*\.(mp3|ogg|wav)$", "i");

var imagePath = pathForRegexp("src/images");
var imageRegExp = new RegExp(imagePath + ".*\.(jpe?g|png|gif|svg)$", "i");

var fontPath = pathForRegexp("src/fonts");
var fontRegExp = new RegExp(fontPath + ".*\.(eot|svg|ttf|woff2?)$", "i");

var htmlPath = pathForRegexp("src/");
var htmlRegExp = new RegExp(htmlPath + ".*\.html", "i");

function escapeForRegExp(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

function pathForRegexp(url) {
  var normalized = path.resolve(__dirname, url);
  return escapeForRegExp(normalized);
}

module.exports = {
  entry: {
    index: [ "./src/game" ]
  },
  devtool: "source-map",
  output: {
    path: __dirname + "/build/html",
    filename: "[name].js"
  },
  module: {
    preLoaders: [
      { test: /\.(js|json)$/, exclude: /node_modules/, loader: "eslint-loader" },
      {
        test: soundRegExp,
        loader: "file?hash=sha512&digest=hex&name=[path][name].[ext]&context=src"
      },
      {
        test: imageRegExp,
        loaders: [
          "file?hash=sha512&digest=hex&name=[path][name].[ext]&context=src"
          //"image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false"
        ]
      },
      {
        test: fontRegExp,
        loader: "file?hash=sha512&digest=hex&name=[path][name].[ext]&context=src"
      },
      {
        test: htmlRegExp,
        loader: "file?hash=sha512&digest=hex&name=[path][name].[ext]&context=src"
      }
    ],
    loaders: [
      { test: /\.json$/, loader: "json" }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __PRODUCTION__: environment === "production",
      __TEST__: environment === "test",
      __DEVELOPMENT__: environment === "development"
    })
  ]
};
