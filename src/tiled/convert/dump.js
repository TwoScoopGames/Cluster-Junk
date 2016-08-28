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

    var dest = [];
    for (var i = 0; i < b.length; i += 4) {
      var inWord = b.readUInt32LE(i);
      dest.push(inWord);
    }
    console.log(JSON.stringify(dest, undefined, 1));
  });
}

function guard(err) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
}
