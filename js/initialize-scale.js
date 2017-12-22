'use strict';

(function () {

  window.initializeScale = function (node, action) {
    var resizeValue = node.querySelector('.upload-resize-controls-value');
    var min = Number(resizeValue.getAttribute('min').replace('%', ''));
    var max = Number(resizeValue.getAttribute('max').replace('%', ''));
    var step = Number(resizeValue.getAttribute('step').replace('%', ''));
    var decButton = node.querySelector('.upload-resize-controls-button-dec');
    var incButton = node.querySelector('.upload-resize-controls-button-inc');

    var getScaleValue = function (way) {
      var value = Number(resizeValue.getAttribute('value').replace('%', ''));
      way = way || false;
      if (way) {
        value += step;
        if (value > max) {
          value = max;
        }
      } else {
        value -= step;
        if (value < min) {
          value = min;
        }
      }
      resizeValue.setAttribute('value', value + '%');
      return value;
    };

    decButton.addEventListener('click', function () {
      action(getScaleValue());
    });

    incButton.addEventListener('click', function () {
      action(getScaleValue(true));
    });
  };
})();
