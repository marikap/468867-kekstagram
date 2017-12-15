'use strict';

(function () {
  var template = document.querySelector('#picture-template');

  window.picture = {
    renderPicture: function (photo) {
      var node = template.content.cloneNode(true);
      node.querySelector('img').setAttribute('src', photo.url);
      node.querySelector('.picture-likes').textContent = photo.likes;
      node.querySelector('.picture-comments').textContent = photo.comments;

      return node;
    }
  };
})();
