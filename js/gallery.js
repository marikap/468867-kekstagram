'use strict';

(function () {

  var loadObjects = function (block, objects) {
    var fragment = document.createDocumentFragment();
    for (var i = objects.length - 1; i >= 0; i--) {
      fragment.appendChild(window.picture.renderPicture(objects[i]));
    }
    block.appendChild(fragment);
  };

  var addHandlers = function (pictures) {
    for (var i = pictures.length - 1; i >= 0; i--) {
      pictures[i].addEventListener('click', function (evt) {
        evt.preventDefault();
        window.preview.openPopup(evt);
      });
    }
  };

  window.backend.load(
      function (response) {
        loadObjects(document.querySelector('.pictures'), response);
        addHandlers(document.querySelectorAll('.picture'));
      },
      window.util.displayError
  );

})();
