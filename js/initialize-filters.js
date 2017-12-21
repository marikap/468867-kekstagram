'use strict';

(function () {
  window.initializeFilters = function (node, actions) {
    node.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('upload-effect-preview')) {
        actions.forEach(function (action) {
          action(evt);
        });
      }
    });
  };
})();

