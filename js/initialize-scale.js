'use strict';

(function () {
  var resizeValue = document.querySelector('.upload-resize-controls-value');
  var min = Number(resizeValue.getAttribute('min').replace('%', ''));
  var max = Number(resizeValue.getAttribute('max').replace('%', ''));
  var step = Number(resizeValue.getAttribute('step').replace('%', ''));
  var value = Number(resizeValue.getAttribute('value').replace('%', ''));

  var getScaleValue = function (way) {
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

  window.initializeScale = function (node, action, way) {
    node.addEventListener('click', function () {
      action(resizeValue, getScaleValue(way));
    });
  };
})();
