'use strict';

(function () {

  var overlay = document.querySelector('.upload-overlay');
  var resizeValue = document.querySelector('.upload-resize-controls-value');
  var hashtagsField = document.querySelector('.upload-form-hashtags');
  var descriptionField = document.querySelector('.upload-form-description');
  var imagePreview = document.querySelector('.effect-image-preview');
  var currentFilter = '';

  var getValueCountInArray = function (array, value) {
    var count = 0;
    for (var i = array.length - 1; i >= 0; i--) {
      if (array[i] === value) {
        count++;
      }
    }
    return count;
  };

  var onUploadOverlayEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closeUploadOverlay();
    }
  };

  var openUploadOverlay = function () {
    overlay.classList.remove('hidden');
    document.addEventListener('keydown', onUploadOverlayEscPress);
  };

  var closeUploadOverlay = function () {
    overlay.classList.add('hidden');
    document.removeEventListener('keydown', onUploadOverlayEscPress);
  };

  var applyEffect = function (evt) {
    if (currentFilter.length > 0) {
      imagePreview.classList.remove(currentFilter);
    }
    currentFilter = evt.target.parentNode.htmlFor.replace('upload-', '');
    imagePreview.classList.add(currentFilter);
  };

  var resizeImage = function (way) {
    way = way || false;
    var min = Number(resizeValue.getAttribute('min').replace('%', ''));
    var max = Number(resizeValue.getAttribute('max').replace('%', ''));
    var step = Number(resizeValue.getAttribute('step').replace('%', ''));
    var value = Number(resizeValue.getAttribute('value').replace('%', ''));

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
    imagePreview.setAttribute('style', 'transform: scale(' + value / 100 + ')');
  };

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

  document.querySelector('#upload-file').addEventListener('change', function () {
    openUploadOverlay();
  });

  document.querySelector('.upload-form-cancel').addEventListener('click', function () {
    closeUploadOverlay();
  });

  document.querySelector('#upload-select-image').addEventListener('click', function (evt) {
    if (evt.target.classList.contains('upload-effect-preview')) {
      applyEffect(evt);
    }
  });

  document.querySelector('.upload-resize-controls-button-dec').addEventListener('click', function () {
    resizeImage();
  });

  document.querySelector('.upload-resize-controls-button-inc').addEventListener('click', function () {
    resizeImage(true);
  });

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
