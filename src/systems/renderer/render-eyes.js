"use strict";

function pupilOffset(movement2d) {
  var px = 0;
  var py = 0;
  if (movement2d.left) {
    px -= 20;
  }
  if (movement2d.right) {
    px += 20;
  }
  if (movement2d.up) {
    py -= 10;
  }
  if (movement2d.down) {
    py += 20;
  }
  return { x: px, y: py };
}

function tween(start, end, pct) {
  pct = pct || 0.1;
  var diff = end - start;
  return start + (diff * pct);
}

//This is hand-tweaked for the playstation 2 controller
function stickDeadZone(game, axis) {
  return game.inputs.axis(axis) < 0.6 && game.inputs.axis(axis) > 0.4;
}

var lidFrames = [2, 1, 0, 1, 2, 1];
var lidFrameTimes = [2000, 200, 2500, 60, 60, 60];
var lidFramesToSpeedUp = [true, false, true, false, false, false];

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  game.entities.registerSearch("renderEyes", ["position", "size", "movement2d", "eyes"]);
  ecs.addEach(function renderEyes(entity, elapsed) { // eslint-disable-line no-unused-vars
    var position = game.entities.getComponent(entity, "position");
    var size = game.entities.getComponent(entity, "size");
    var eyesComponent = game.entities.getComponent(entity, "eyes");

    var cx = position.x + size.width / 2;
    var cy = position.y + size.height / 2;

    var camera = 1;
    var cameraPosition = game.entities.getComponent(camera, "position");
    var cameraSize = game.entities.getComponent(camera, "size");

    var cpctx = (cx - cameraPosition.x) / cameraSize.width;
    var x = game.canvas.width * cpctx;
    var cpcty = (cy - cameraPosition.y) / cameraSize.height;
    var y = game.canvas.height * cpcty;

    var eyes = game.images.get("eyes.png");
    var ex = x - (eyes.width / 2);
    var ey = y - (eyes.height / 2);
    game.context.drawImage(eyes, ex, ey);

    var pupils = game.images.get("pupils.png");
    var px = x - (pupils.width / 2);
    var py = y - (pupils.height / 2);


    var po = pupilOffset(game.entities.getComponent(entity, "movement2d"));

    eyesComponent.pupilOffsetX = tween(eyesComponent.pupilOffsetX, po.x);
    eyesComponent.pupilOffsetY = tween(eyesComponent.pupilOffsetY, po.y);

    if (game.inputs.gamepad.gamepads.length > 0) {
      if (!stickDeadZone(game, "right-stick-x") || !stickDeadZone(game, "right-stick-y")) {
        if (!stickDeadZone(game, "right-stick-x")) {
          var xAxis = game.inputs.axis("right-stick-x") - 0.5;
          px += xAxis * 25;
        }
        if (!stickDeadZone(game, "right-stick-y")) {
          var yAxis = game.inputs.axis("right-stick-y") - 0.5;
          py += yAxis * 25;
        }
      }
    } else {
      px += eyesComponent.pupilOffsetX;
      py += eyesComponent.pupilOffsetY;
    }


    game.context.drawImage(pupils, px, py);

    var lids = game.images.get("eyelashes-f3.png");
    if (lidFramesToSpeedUp[eyesComponent.lidFrame]) {
      eyesComponent.lidTime += elapsed * (eyesComponent.speed || 1.0);
    } else {
      eyesComponent.lidTime += elapsed;
    }
    while (eyesComponent.lidTime > lidFrameTimes[eyesComponent.lidFrame]) {
      eyesComponent.lidTime -= lidFrameTimes[eyesComponent.lidFrame];
      eyesComponent.lidFrame++;
      if (eyesComponent.lidFrame >= lidFrames.length) {
        eyesComponent.lidFrame = 2;
      }
    }

    if (eyesComponent.script && eyesComponent.lidFrame === 2) {
      var script = game.require(eyesComponent.script);
      script(entity, game);
      delete eyesComponent.script;
    }
    if (eyesComponent.blinkSound && eyesComponent.lidFrame === 4) {
      game.sounds.play(eyesComponent.blinkSound);
    }

    // Blink button
    if (game.inputs.buttonPressed("blink1")) {
      game.sounds.play("sfx-blink.mp3");
    }
    if (game.inputs.buttonPressed("blink2")) {
      game.sounds.play("sfx-blink-2.mp3");
    }
    if (game.inputs.button("blink1") || game.inputs.button("blink2")) {
      eyesComponent.lidFrame = 4;
    }

    var lw = lids.width / 3;
    var lx = x - (lw / 2);
    var ly = y - (lids.height / 2);
    game.context.drawImage(lids, (lidFrames[eyesComponent.lidFrame] * lw), 0, lw, lids.height, lx, ly, lw, lids.height);

  }, "renderEyes");
};
