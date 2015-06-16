'use strict';

module.exports = {
  type: 'ServerSideUpdate',
  func: function() {
    return function (state, delta) {
      var pos = state.for('bouncing-ball-game').get('ball')('position');
      var radius = state.for('bouncing-ball-game').get('ball')('radius');
      var speed = state.for('bouncing-ball-game').get('ball')('speed');
      var board = state.for('bouncing-ball-game').get('board');

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
  }
};