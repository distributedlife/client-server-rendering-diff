'use strict';

var $ = require('zepto-browserify').$;

module.exports = {
  type: 'View',
  deps: ['Element', 'StateTracker', 'DefinePlugin'],
  func: function (element, tracker, define) {
    var ballColour = function(demeanour) {
      if (demeanour === 'happy') {
        return '#ffffff';
      } else {
        return '#ff0000';
      }
    };

    var drawBall = function(context, position, demeanour, radius) {
      context.fillStyle = ballColour(demeanour);
      context.beginPath();
      context.arc(position.x, position.y, radius, 0, 2*Math.PI);
      context.closePath();
      context.fill();
    };

    var drawBoard = function(context, dimensions) {
      context.fillStyle = '#55ff55';
      context.fillRect(0, 0, dimensions.width, dimensions.height);
    };

    var theBallPosition = function (state) {
      return state['bouncing-ball-game'].ball.position;
    };

    var theBallRadius = function (state) {
      return state['bouncing-ball-game'].ball.radius;
    };

    var theBallDemeanour = function (state) {
      return state['bouncing-ball-game'].ball.demeanour;
    };

    var theBoardDimensions = function (state) {
      return state['bouncing-ball-game'].board;
    };

    var calculateOffset = function (boardDimensions, screenDimensions) {
      return {
        x: (screenDimensions.usableWidth - boardDimensions.width) / 2,
        y: (screenDimensions.usableHeight - boardDimensions.height) / 2
      };
    };

    var offset;
    return function (dims) {
      var canvas = $('<canvas/>', { id: 'scene' });
      canvas[0].width = dims.usableWidth;
      canvas[0].height = dims.usableHeight;
      var context = canvas[0].getContext('2d');

      $('#' + element()).append(canvas);

      offset = calculateOffset(tracker().get(theBoardDimensions), dims);
      context.translate(offset.x, offset.y);

      define()('OnEachFrame', function () {
        return function () {
          context.clearRect(0, 0, canvas[0].width, canvas[0].height);
          drawBoard(context, tracker().get(theBoardDimensions));
          drawBall(context, tracker().get(theBallPosition), tracker().get(theBallDemeanour), tracker().get(theBallRadius));
        };
      });

      define()('OnResize', function () {
        return function (dims) {
          canvas[0].width = dims.usableWidth;
          canvas[0].height = dims.usableHeight;
          offset = calculateOffset(tracker().get(theBoardDimensions), dims);
        };
      });
    };
  }
};