'use strict';

function ballColour (demeanour) {
  if (demeanour === 'happy') {
    return '#ffffff';
  } else {
    return '#ff0000';
  }
}

function drawBall (context, position, demeanour, radius) {
  context.fillStyle = ballColour(demeanour);
  context.beginPath();
  context.arc(position.x, position.y, radius, 0, 2*Math.PI);
  context.closePath();
  context.fill();
}

function drawBoard (context, dimensions) {
  context.fillStyle = '#55ff55';
  context.fillRect(0, 0, dimensions.width, dimensions.height);
}

function theBallPosition (state) {
  return state['bouncing-ball-game'].ball.position;
}

function theBallRadius (state) {
  return state['bouncing-ball-game'].ball.radius;
}

function theBallDemeanour (state) {
  return state['bouncing-ball-game'].ball.demeanour;
}

function theBoardDimensions (state) {
  return state['bouncing-ball-game'].board;
}

function calculateOffset (boardDimensions, screenDimensions) {
  return {
    x: (screenDimensions.usableWidth - boardDimensions.width) / 2,
    y: (screenDimensions.usableHeight - boardDimensions.height) / 2
  };
}

module.exports = {
  type: 'OnReady',
  deps: ['Config', 'DefinePlugin', 'CurrentState', '$'],
  func: function View (config, define, currentState, $) {
    var offset;
    return function setup (dims) {
      var canvas = $()('<canvas/>', { id: 'scene' });
      canvas[0].width = dims.usableWidth;
      canvas[0].height = dims.usableHeight;
      var context = canvas[0].getContext('2d');

      $()('#' + config().client.element).append(canvas);

      offset = calculateOffset(currentState().get(theBoardDimensions), dims);
      context.translate(offset.x, offset.y);

      define()('OnRenderFrame', function () {
        return function renderScene () {
          context.clearRect(0, 0, canvas[0].width, canvas[0].height);
          drawBoard(context, currentState().get(theBoardDimensions));
          drawBall(context, currentState().get(theBallPosition), currentState().get(theBallDemeanour), currentState().get(theBallRadius));
        };
      });

      define()('OnResize', function () {
        return function resizeScene (dims) {
          canvas[0].width = dims.usableWidth;
          canvas[0].height = dims.usableHeight;
          offset = calculateOffset(currentState().get(theBoardDimensions), dims);
        };
      });
    };
  }
};