'use strict';

(function () {
  
  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  
  window.data = {
    selectRandomElements: function (count, array) {
      var out = [];
      var maxIndex = array.length - 1;
      for (var i = 0; i < count; i++) {
        out[i] = array[window.data.getRandomComments(0, maxIndex, true)];
      }
      return out;
    },
    getRandomComments: function (min, max, round) {
      round = round || false;
      var out = Math.random() * (max - min) + min;
      return round ? Math.round(out) : out;
    },
    getValueCountInArray: function (array, value) {
      var count = 0;
      for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] === value) {
          count++;
        }
      }
      return count;
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    createPhotoObjects: function () {
      var photos = [];
      for (var i = 0; i < 25; i++) {
        photos[i] = {
          url: 'photos/' + (i + 1) + '.jpg',
          likes: window.data.getRandomComments(15, 200, true),
          comments: window.data.selectRandomElements(window.data.getRandomComments(1, 2, true), comments)
        };
      }
      return photos;
    }
  };

})();
