var tracksToStop = [
  "ambient-sea-track.mp3",
  "trash-island-theme.mp3",
  "trash-island-theme-2x.mp3",
  "trash-island-bossa.mp3",
  "trash-island-bossa-2x.mp3"
];

module.exports = function(game) { // eslint-disable-line no-unused-vars
  tracksToStop.forEach(function(track) {
    game.sounds.stop(track);
  });
};
