'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (event) {
      return event.keyCode === ESC_KEYCODE;
    },
    isEnterEvent: function (event) {
      return event.keyCode === ENTER_KEYCODE;
    },
	
	displayError: function (errorMessage) {
	  var node = document.createElement('div');
      node.classList.add('upload-form-errorMessage');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';
      node.style.color = '#fff';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    },
    clearErrorMessage: function () {
      var remNode = document.querySelector('.upload-form-errorMessage');

      if (remNode) {
        remNode.parentNode.removeChild(remNode);
      }
},
  };
})();
