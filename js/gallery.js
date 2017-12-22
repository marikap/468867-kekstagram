'use strict';

(function () {

  var filters = document.querySelector('.filters');
  var pictures = document.querySelector('.pictures');
  var unsortedData;
  var sortedData;

  var createGallery = function () {
    loadObjects(pictures, sortedData);
    addHandlers(pictures.childNodes);
  };

  var loadObjects = function (block, objects) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < objects.length; i++) {
      fragment.appendChild(window.picture.renderPicture(objects[i]));
    }
    while (block.firstChild) {
      block.removeChild(block.firstChild);
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
        unsortedData = response;
        sortedData = response.slice(0);
        createGallery();
        filters.classList.remove('hidden');
      },
      window.util.displayError
  );

  var currentFilter = 'recommend';

  var applyFilter = function (evt) {
    if (evt.target.type !== 'radio') {
      return;
    }
    var filter = evt.target.value;
    if (filter === currentFilter && filter !== 'random') {
      return;
    }
    switch (filter) {
      // Популярные фотографии
      case 'popular':
        sortedData = unsortedData.slice(0).sort(function (first, second) {
          return second.likes - first.likes;
        });
        break;
      // Обсуждаемые фотографии
      case 'discussed':
        sortedData = unsortedData.slice(0).sort(function (first, second) {
          return second.comments.length - first.comments.length;
        });
        break;
      // Случайные
      case 'random':
        var copyData = unsortedData.slice(0);
        sortedData = [];
        while (copyData.length > 0) {
          var indexElement = Math.floor(Math.random() * copyData.length);
          sortedData.push(copyData.splice(indexElement, 1)[0]);
        }
        break;
      // Рекомендуемые
      case 'recommend':
      default:
        sortedData = unsortedData.slice(0);
    }
    window.debounce(createGallery);
    currentFilter = filter;
  };

  filters.addEventListener('click', function (evt) {
    applyFilter(evt);
  });
})();
