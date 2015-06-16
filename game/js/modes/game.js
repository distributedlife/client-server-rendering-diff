'use strict';

module.exports = {
  type: 'BouncingBallGame',
  deps: ['DefinePlugin', 'BouncingBallGame-Behaviour'],
  func: function(define, behaviour) {
    return function() {

      define()('ActionMap', function () {
        return {
          'button1': [{target: behaviour().changeColour, onRelease: true}]
        };
      });
    };
  }
};