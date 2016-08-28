process.stdin
  .on("data", addData)
  .on("end", work);

var encoded = "";
function addData(data) {
  encoded += data;
}

var zlib = require("zlib");

function work() {
  var b = Buffer.from(encoded, "base64");

  zlib.inflate(b, function(err, b) {
    guard(err);
    // console.log(b);
    // console.log(b.length);

    var scaleFactor = 8;
    var dangerTile = 51 + 1;
    var width = Math.sqrt(b.length / 4);
    var height = width;

    var dest = Buffer.alloc(b.length * scaleFactor * scaleFactor);
    var destIdx = 0;

    for (var y = 0; y < height; y++) {
      for (var i = 0; i < 8; i++) { // so we draw each row 4 times
        for (var x = 0; x < width; x++) {
          var srcIdx = (y * width * 4) + (x * 4);
          var inWord = b.readUInt32LE(srcIdx);
          var outWord = inWord === 0 ? 0 : dangerTile;

          for (var j = 0; j < 8; j++) { // so we draw each column 4 times
            dest.writeUInt32LE(outWord, destIdx);
            destIdx += 4;
          }
        }
      }
    }

    zlib.deflate(dest, function(err2, compressed) {
      guard(err2);
      console.log(compressed.toString("base64"));
    });
  });
}

function guard(err) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
}
