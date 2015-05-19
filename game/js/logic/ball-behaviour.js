'use strict';

module.exports = {
  type: 'BouncingBallGame-Behaviour',
  deps: ['StateAccess'],
  func: function (state) {
    return {
      changeColour: function () {
        var currentDemeanour = state().get('bouncing-ball-game')('ball')('demeanour');
        var newDemeanour = (currentDemeanour === 'happy' ? 'angry' : 'happy');

        return {
          'bouncing-ball-game': {
            ball: {
              demeanour: newDemeanour
            }
          }
        };
      }
    };
  }
};