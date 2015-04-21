'use strict';

var $ = require('zepto-browserify').$;

module.exports = {
  type: 'View',
  deps: ['Element', 'Dimensions', 'StateTracker'],
  func: function (element, dimensions, tracker) {
    var canvas;
    var context;
    var dims;

    var updateBall = function(currentPosition, priorPosition, color) {
      context.fillStyle = color;

      if (currentPosition === undefined) {
        context.beginPath();
        context.arc(priorPosition.x,priorPosition.y,25,0,2*Math.PI);
        context.closePath();
        context.fill();
      } else {
        context.beginPath();
        context.arc(currentPosition.x,currentPosition.y,25,0,2*Math.PI);
        context.closePath();
        context.fill();
      }
    };

    var theBallPosition = function (state) {
      return state['bouncing-ball-game'].ball.position;
    };

    var position = {
      x: 100,
      y: 50
    };
    var speed = {
      x: 100,
      y: 50
    };

    return {
      update: function (delta) {
        if (context === undefined) {
          return;
        }

        position.x += speed.x * delta;
        position.y += speed.y * delta;

        if ((position.x > 500) || (position.x < 0)) {
          speed.x = speed.x * -1;
        }
        if ((position.y > 500) || (position.y < 0)) {
          speed.y = speed.y * -1;
        }








        context.clearRect(0, 0, canvas[0].width, canvas[0].height);
        updateBall(tracker().get(theBallPosition), undefined, 'blue');
        updateBall(position, undefined, 'red');
      },
      setup: function () {
        dims = dimensions().get();

        canvas = $('<canvas/>', { id: 'scene' });
        canvas[0].width = dims.usableWidth;
        canvas[0].height = dims.usableHeight;
        context = canvas[0].getContext('2d');

        $('#' + element()).append(canvas);

        tracker().onChangeOf(theBallPosition, updateBall, 'green');
      },
      screenResized: function () {
        dims = dimensions().get();

        if (canvas !== undefined) {
          canvas[0].width = dims.usableWidth;
          canvas[0].height = dims.usableHeight;
        }
      }
    };
  }
};