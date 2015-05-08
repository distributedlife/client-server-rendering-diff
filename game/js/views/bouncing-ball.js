'use strict';

var $ = require('zepto-browserify').$;

module.exports = {
  type: 'View',
  deps: ['Element', 'Dimensions', 'StateTracker', 'DefinePlugin'],
  func: function (element, dimensions, tracker, define) {
    var canvas;
    var context;

    var updateBall = function(currentPosition) {
      if (currentPosition === undefined) {
        return;
      }

      context.fillStyle = 'blue';
      context.beginPath();
      context.arc(currentPosition.x, currentPosition.y, 25, 0, 2*Math.PI);
      context.closePath();
      context.fill();
    };

    var theBallPosition = function (state) {
      return state['bouncing-ball-game'].ball.position;
    };

    return function (dims) {
      canvas = $('<canvas/>', { id: 'scene' });
      canvas[0].width = dims.usableWidth;
      canvas[0].height = dims.usableHeight;
      context = canvas[0].getContext('2d');

      $('#' + element()).append(canvas);

      define()('OnEachFrame', function () {
        return function () {
          context.clearRect(0, 0, canvas[0].width, canvas[0].height);
          updateBall(tracker().get(theBallPosition));
        };
      });

      define()('OnResize', function () {
        return function (dims) {
          canvas[0].width = dims.usableWidth;
          canvas[0].height = dims.usableHeight;
        };
      });
    };
  }
};