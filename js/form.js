'use strict';

(function () {

  var overlay = document.querySelector('.upload-overlay');
  var hashtagsField = document.querySelector('.upload-form-hashtags');
  var descriptionField = document.querySelector('.upload-form-description');
  var imagePreview = document.querySelector('.effect-image-preview');
  var currentFilter = '';

  var effectControls = document.querySelector('.upload-effect-level');
  var levelPin = document.querySelector('.upload-effect-level-pin');
  var levelValue = document.querySelector('.upload-effect-level-value');
  var defaultLevelValue = levelValue.value;
  var levelLine = document.querySelector('.upload-effect-level-line');
  var levelBar = document.querySelector('.upload-effect-level-val');

  var startX;
  var cursorLeftLimit;
  var cursorRightLimit;

  var getValueCountInArray = function (array, value) {
    var count = 0;
    for (var i = array.length - 1; i >= 0; i--) {
      if (array[i] === value) {
        count++;
      }
    }
    return count;
  };

  // upload overlay

  var onUploadOverlayEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closeUploadOverlay();
    }
  };

  var openUploadOverlay = function () {
    overlay.classList.remove('hidden');
    displayEffectControls();
    document.addEventListener('keydown', onUploadOverlayEscPress);
  };

  var closeUploadOverlay = function () {
    overlay.classList.add('hidden');
    document.removeEventListener('keydown', onUploadOverlayEscPress);
  };

  document.querySelector('#upload-file').addEventListener('change', function () {
    openUploadOverlay();
  });
  document.querySelector('.upload-form-cancel').addEventListener('click', function () {
    closeUploadOverlay();
  });

  // resize

  var resizeImage = function (valueElement, value) {
    valueElement.setAttribute('value', value + '%');
    imagePreview.style.transform = 'scale(' + value / 100 + ')';
  };
  window.initializeFilters(document.querySelector('#upload-select-image'), [applyEffect, displayEffectControls]);
  window.initializeScale(document.querySelector('.upload-resize-controls-button-dec'), resizeImage);
  window.initializeScale(document.querySelector('.upload-resize-controls-button-inc'), resizeImage, true);

  // effects

  var displayEffectControls = function () {
    if (currentFilter.length === 0 || currentFilter === 'effect-none') {
      effectControls.classList.add('hidden');
    } else {
      effectControls.classList.remove('hidden');
    }
  };

  var applyEffect = function (evt) {
    levelValue.value = defaultLevelValue;
    levelPin.style.left = levelBar.style.width = defaultLevelValue + '%';

    if (currentFilter.length > 0) {
      imagePreview.classList.remove(currentFilter);
    }
    currentFilter = evt.target.parentNode.htmlFor.replace('upload-', '');
    applyEffectValue(defaultLevelValue);
  };

  var applyEffectValue = function (value) {
    var newFilter;
    switch (currentFilter) {
      case 'effect-chrome':
        newFilter = 'grayscale(' + value / 100 + ')';
        break;
      case 'effect-sepia':
        newFilter = 'sepia(' + value / 100 + ')';
        break;
      case 'effect-marvin':
        newFilter = 'invert(' + value + '%)';
        break;
      case 'effect-phobos':
        newFilter = 'blur(' + value * 3 / 100 + 'px)';
        break;
      case 'effect-heat':
        newFilter = 'brightness(' + value * 3 / 100 + ')';
        break;
      default:
        newFilter = '';
    }
    imagePreview.style.filter = newFilter;
  };

  levelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    startX = evt.clientX;
    cursorLeftLimit = -1;
    cursorRightLimit = -1;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

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
    applyEffectValue(newValuePercent);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.querySelector('#upload-select-image').addEventListener('click', function (evt) {
    if (evt.target.classList.contains('upload-effect-preview')) {
      applyEffect(evt);
      displayEffectControls();
    }
  });
  // validate & submit

  var validate = function () {
    var correct = true;
    correct = displayCheck(hashtagsField, checkHashtags(hashtagsField)) && correct;
    correct = displayCheck(descriptionField, checkDescription(descriptionField)) && correct;
    return correct;
  };

  var displayCheck = function (node, checkResult) {
    var invalidStyle = 'outline: 1px solid red';
    var validStyle = 'outline: none';

    node.setAttribute('style', checkResult ? validStyle : invalidStyle);
    return checkResult;
  };

  var checkHashtags = function (node) {
    var hashtagString = node.value.toLowerCase();

    if (hashtagString.length === 0) {
      return true;
    }
    var hashtags = hashtagString.split(/\s+/g);
    if (hashtags.length > 5) {
      return false;
    }
    for (var i = hashtags.length - 1; i >= 0; i--) {
      if (hashtags[i].length > 20
            || !(hashtags[i].startsWith('#'))
            || getValueCountInArray(hashtags, hashtags[i]) > 1) {
        return false;
      }
    }

    return true;
  };

  var checkDescription = function (node) {
    return !(node.value.length > 140);
  };

  hashtagsField.addEventListener('change', function () {
    displayCheck(hashtagsField, checkHashtags(hashtagsField));
  });
  descriptionField.addEventListener('change', function () {
    displayCheck(descriptionField, checkDescription(descriptionField));
  });
  document.querySelector('.upload-form').addEventListener('submit', function (evt) {
    if (!validate()) {
      evt.preventDefault();
    }
  });
})();

