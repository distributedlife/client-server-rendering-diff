'use strict';

var $ = require('zepto-browserify').$;

module.exports = {
  type: 'View',
  deps: ['Element', 'Dimensions', 'StateTracker'],
  func: function (element, dimensions, tracker) {
    var canvas;
    var context;
    var dims;

    var updateBall = function(currentPosition) {
      if (currentPosition === undefined) {
        return;
      }

      context.fillStyle = 'blue';
      context.beginPath();
      console.log(currentPosition);
      context.arc(currentPosition.x, currentPosition.y, 25, 0, 2*Math.PI);
      context.closePath();
      context.fill();
    };

    var theBallPosition = function (state) {
      return state['bouncing-ball-game'].ball.position;
    };

    return {
      update: function () {
        if (context === undefined) {
          return;
        }
        context.clearRect(0, 0, canvas[0].width, canvas[0].height);

        updateBall(tracker().get(theBallPosition));
      },
      setup: function () {
        dims = dimensions().get();

        canvas = $('<canvas/>', { id: 'scene' });
        canvas[0].width = dims.usableWidth;
        canvas[0].height = dims.usableHeight;
        context = canvas[0].getContext('2d');

        $('#' + element()).append(canvas);
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