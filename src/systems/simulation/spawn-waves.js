
var time = 0;
var rowHeight = 60;
var waveHeight = 20;
var wavePeriod = 4000;
var rowsBeforeRepeat = 8;
var rowsOffset = Math.PI * 2 / rowsBeforeRepeat;
var sinPeriod = 2 * Math.PI;

module.exports = function(ecs, game) {
  ecs.addEach(function spawnWaves(entity, elapsed) {
    var cameraPosition = game.entities.getComponent(entity, "position");
    var cameraSize = game.entities.getComponent(entity, "size");

    var waves = game.entities.find("wave");
    if (waves.length > 0) {
      return;
    }
    // for (var i = 0; i < waves.length; i++) {
    //   game.entities.destroy(waves[i]);
    // }

    time += elapsed;

    var f1 = game.images.get("waves.png");

    var startX = Math.floor(cameraPosition.x / f1.width) * f1.width;
    var startRow = Math.floor(cameraPosition.y / rowHeight);
    var startY = (startRow - 1) * rowHeight;

    var periodPercent = time / wavePeriod;
    var something = periodPercent * sinPeriod;

    var cameraRight = cameraPosition.x + cameraSize.width + f1.width;
    var cameraBottom = cameraPosition.y + cameraSize.height;

    for (var y = startY; y <= cameraBottom; y += rowHeight) {

      var offset = y / rowHeight % rowsBeforeRepeat * rowsOffset;

      var waveY = Math.floor(y + Math.sin(something + offset) * waveHeight);

      var rowX = Math.sin(something * 2 + offset) * waveHeight / 2;
      var even = Math.floor(y / rowHeight) % 2;
      rowX = even ? rowX : rowX - 100;

      for (var x = startX; x <= cameraRight; x += f1.width) {
        var waveX = Math.floor(x + rowX);
        createWaveAt(game, waveX, waveY);
      }
    }
  }, "camera");
};

function createWaveAt(game, x, y) {
  var wave = game.prefabs.instantiate(game.entities, "wave");
  var wpos = game.entities.getComponent(wave, "position");
  wpos.x = x;
  wpos.y = y;
}
