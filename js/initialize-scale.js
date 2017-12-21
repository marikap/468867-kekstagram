'use strict';

(function () {

  var getScaleValue = function (value, min, max, step, way) {
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
    return value;
  };

  window.initializeScale = function (node, action) {
    var resizeValue = node.querySelector('.upload-resize-controls-value');
    var min = Number(resizeValue.getAttribute('min').replace('%', ''));
    var max = Number(resizeValue.getAttribute('max').replace('%', ''));
    var step = Number(resizeValue.getAttribute('step').replace('%', ''));
    var value = Number(resizeValue.getAttribute('value').replace('%', ''));
    var decButton = node.querySelector('.upload-resize-controls-button-dec');
    var incButton = node.querySelector('.upload-resize-controls-button-inc');

    decButton.addEventListener('click', function () {
      action(resizeValue, getScaleValue(value, min, max, step));
    });

    incButton.addEventListener('click', function () {
      action(resizeValue, getScaleValue(value, min, max, step, true));
    });
  };
})();
