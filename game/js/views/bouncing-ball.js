'use strict';

var $ = require('zepto-browserify').$;

module.exports = {
  type: 'View',
  deps: ['Element', 'StateTracker', 'DefinePlugin'],
  func: function (element, tracker, define) {
    var drawBall = function(context, position, demeanour) {
      if (demeanour === 'happy') {
        context.fillStyle = '#ffffff';
      } else {
        context.fillStyle = '#ff0000';
      }

      context.beginPath();
      context.arc(position.x, position.y, 25, 0, 2*Math.PI);
      context.closePath();
      context.fill();
    };

    var theBallPosition = function (state) {
      return state['bouncing-ball-game'].ball.position;
    };

    var theBallDemeanour = function (state) {
      return state['bouncing-ball-game'].ball.demeanour;
    };

    return function (dims) {
      var canvas = $('<canvas/>', { id: 'scene' });
      canvas[0].width = dims.usableWidth;
      canvas[0].height = dims.usableHeight;
      var context = canvas[0].getContext('2d');

      $('#' + element()).append(canvas);

      define()('OnEachFrame', function () {
        return function () {
          context.clearRect(0, 0, canvas[0].width, canvas[0].height);
          drawBall(context, tracker().get(theBallPosition), tracker().get(theBallDemeanour));
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