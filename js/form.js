'use strict';

(function () {

  var overlay = document.querySelector('.upload-overlay');
  var hashtagsField = document.querySelector('.upload-form-hashtags');
  var descriptionField = document.querySelector('.upload-form-description');
  var imagePreview = document.querySelector('.effect-image-preview');
  var valueElement = '';

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

  var resizeImage = function (value) {
    valueElement.setAttribute('value', value + '%');
    imagePreview.style.transform = 'scale(' + value / 100 + ')';
  };
  window.initializeScale(document.querySelector('.upload-resize-controls'), resizeImage);

  // effects

  var applyFilter = function (filter) {
    imagePreview.style.filter = filter;
  };
  window.initializeFilters(document.querySelector('.upload-effect__container'), applyFilter);

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

