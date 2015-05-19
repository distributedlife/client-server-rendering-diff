'use strict';

module.exports = {
  type: 'BouncingBallGame',
  deps: ['DefinePlugin', 'BouncingBallGame-Behaviour'],
  func: function(define, behaviour) {
    return function() {
      define()('StateSeed', function () {
        return {
          'bouncing-ball-game': {
            ball: {
              position: { x: 100, y: 50 },
              speed: { x: 100, y: 50 },
              radius: 25,
              demeanour: 'happy'
            },
            board: {
              width: 500,
              height: 500
            }
          }
        };
      });

      define()('ServerSideUpdate', ['StateAccess'], function(state) {
        return function (delta) {
          var pos = state().get('bouncing-ball-game')('ball')('position');
          var radius = state().get('bouncing-ball-game')('ball')('radius');
          var speed = state().get('bouncing-ball-game')('ball')('speed');
          var board = state().get('bouncing-ball-game')('board');

          var newPos = {
            x: pos('x') + speed('x') * delta,
            y: pos('y') + speed('y') * delta
          };

          var newSpeed = {
            x: speed('x'),
            y: speed('y')
          };

          if ((newPos.x + radius >= board('width')) || (newPos.x - radius <= 0)) {
            newSpeed.x = speed('x') * -1;
          }
          if ((newPos.y + radius >= board('height')) || (newPos.y - radius <= 0)) {
            newSpeed.y = speed('y') * -1;
          }

          return {
            'bouncing-ball-game': {
              ball: {
                position: newPos,
                speed: newSpeed
              }
            }
          };
        };
      });

      define()('ActionMap', function () {
        return {
          'button1': [{target: behaviour().changeColour, onRelease: true}]
        };
      });
    };
  }
};