'use strict';

(function () {
  var overlay = document.querySelector('.gallery-overlay');
  var overlayImage = overlay.querySelector('.gallery-overlay-image');
  var overlayLikes = overlay.querySelector('.likes-count');
  var overlayComments = overlay.querySelector('.comments-count');
  var overlayClose = overlay.querySelector('.gallery-overlay-close');

  var openGallery = function () {
    window.galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', function (event) {
      window.util.isEscEvent(event, closePopup);
    });
};

  var onPopupEscPress = function (evt) {
    document.removeEventListener('keydown', function (event) {
      window.util.isEscEvent(event, closePopup);
    });
};
  var setOverlay = function (photo) {
    overlayImage.setAttribute('src', photo.url);
    overlayLikes.textContent = photo.likes;
    overlayComments.textContent = photo.comments.length;
    overlay.classList.remove('hidden');
  };
  var closePopup = function () {
    overlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  overlayClose.addEventListener('click', function () {
    closePopup();
  });

  overlayClose.addEventListener('keydown', function (evt) {
   if(isEnterEvent(evt){
        closePopup();
   }
   });

  window.preview = {
    openPopup: function (evt) {
      var sourceNode;
      if (evt.target.nodeName === 'IMG') {
        sourceNode = evt.target.parentNode;
      } else {
        sourceNode = evt.target;
      }
      setOverlay({
        url: sourceNode.querySelector('img').src,
        likes: sourceNode.querySelector('.picture-likes').textContent,
        comments: sourceNode.querySelector('.picture-comments').textContent
      });

      document.addEventListener('keydown', onPopupEscPress);
    }
  };
})();
