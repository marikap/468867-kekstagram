'use strict';

(function () {

  var calculateFilter = function (filterType, value) {
    var filter;
    switch (filterType) {
      case 'effect-chrome':
        filter = 'grayscale(' + value / 100 + ')';
        break;
      case 'effect-sepia':
        filter = 'sepia(' + value / 100 + ')';
        break;
      case 'effect-marvin':
        filter = 'invert(' + value + '%)';
        break;
      case 'effect-phobos':
        filter = 'blur(' + value * 3 / 100 + 'px)';
        break;
      case 'effect-heat':
        filter = 'brightness(' + value * 3 / 100 + ')';
        break;
      default:
        filter = '';
    }
    return filter;
  };

  window.initializeFilters = function (node, action) {
    var currentFilter = '';

    var effectControls = node.querySelector('.upload-effect-level');
    var levelPin = node.querySelector('.upload-effect-level-pin');
    var levelValue = node.querySelector('.upload-effect-level-value');
    var defaultLevelValue = levelValue.value;
    var levelLine = node.querySelector('.upload-effect-level-line');
    var levelBar = node.querySelector('.upload-effect-level-val');

    var startX;
    var cursorLeftLimit;
    var cursorRightLimit;

    var displayEffectControls = function () {
      if (currentFilter.length === 0 || currentFilter === 'effect-none') {
        effectControls.classList.add('hidden');
      } else {
        effectControls.classList.remove('hidden');
      }
    };

    displayEffectControls();

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      if (((cursorLeftLimit !== -1) && moveEvt.clientX < cursorLeftLimit)
        || ((cursorRightLimit !== -1) && moveEvt.clientX > cursorRightLimit)) {
        return;
      }
      var shiftX = startX - moveEvt.clientX;
      startX = moveEvt.clientX;

      var newValue = levelPin.offsetLeft - shiftX;
      if (newValue < 0) {
        newValue = 0;
        cursorLeftLimit = moveEvt.clientX;
      }
      if (newValue > levelLine.clientWidth) {
        newValue = levelLine.clientWidth;
        cursorRightLimit = moveEvt.clientX;
      }

      var newValuePercent = Math.round(newValue / (levelLine.clientWidth / 100));
      levelValue.value = newValuePercent;
      levelPin.style.left = newValue + 'px';
      levelBar.style.width = newValuePercent + '%';

      var filter = calculateFilter(currentFilter, newValuePercent);
      action(filter);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    var applyEffect = function (evt) {
      levelValue.value = defaultLevelValue;
      levelPin.style.left = levelBar.style.width = defaultLevelValue + '%';

      currentFilter = evt.target.parentNode.htmlFor.replace('upload-', '');

      var filter = calculateFilter(currentFilter, defaultLevelValue);
      action(filter);
    };

    levelPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      startX = evt.clientX;
      cursorLeftLimit = -1;
      cursorRightLimit = -1;

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    node.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('upload-effect-preview')) {
      	applyEffect(evt);
      	displayEffectControls(evt);
      }
    });
  };
})();

