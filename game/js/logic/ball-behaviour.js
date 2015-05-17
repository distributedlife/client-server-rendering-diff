'use strict';

module.exports = {
  type: 'BouncingBallGame-Behaviour',
  deps: ['StateAccess'],
  func: function (state) {
    return {
      changeColour: function () {
        var current = state().get('bouncing-ball-game')('ball')('colour');
        var newColour = (current === '#000000' ? '#ff0000' : '#000000');

        return {
          'bouncing-ball-game': {
            ball: {
              colour: newColour
            }
          }
        };
      }
    };
  }
};