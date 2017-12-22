'use strict';

(function () {

  var filters = document.querySelector('.filters');
  var unsortedData;
  var sortedData;
  var pictureTemplate = document.querySelector('#picture-template').content;
  var createGallery = function () {
    while (loadObjects.firstChild) {
      loadObjects.removeChild(loadObjects.firstChild);
    }
    var fragment = document.createDocumentFragment();
    sortedData.forEach(function (photo) {
      var picturePhoto = renderPhoto(photo, pictureTemplate);
      picturePhoto.querySelector('.picture').addEventListener('click', window.preview.overlayClose);
      fragment.appendChild(picturePhoto);
    });
    loadObjects.appendChild(fragment);
  };
  var renderPhoto = function (photo, template) {
    var photoElement = template.cloneNode(true);
    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture-likes').textContent = photo.likes;
    photoElement.querySelector('.picture-comments').textContent = photo.comments.length;
    return photoElement;
  };
  
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
  var onSuccessLoad = function (data) {
    unsortedData = data;
    sortedData = data;
    createGallery();
    filters.classList.remove('filters-inactive');
  };

  window.backend.load(
      function (response) {
        loadObjects(document.querySelector('.pictures'), response);
        addHandlers(document.querySelectorAll('.picture'));
        onSuccessLoad();
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
        sortedData = unsortedData;
    }
    window.debounce(createGallery);
    currentFilter = filter;
  };

  filters.addEventListener('click', function (evt) {
    applyFilter(evt);
  });
})();
