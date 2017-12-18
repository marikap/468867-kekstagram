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

  var selectRandomElements = function (count, array) {
      var out = [];
      var maxIndex = array.length - 1;
      for (var i = 0; i < count; i++) {
        out[i] = array[getRandomComments(0, maxIndex, true)];
      }
      return out;
    };
  var getRandomComments = function (min, max, round) {
      round = round || false;
      var out = Math.random() * (max - min) + min;
      return round ? Math.round(out) : out;
    };
    
  window.data = {
    createPhotoObjects: function () {
      var photos = [];
      for (var i = 0; i < 25; i++) {
        photos[i] = {
          url: 'photos/' + (i + 1) + '.jpg',
          likes: getRandomComments(15, 200, true),
          comments: selectRandomElements(getRandomComments(1, 2, true), comments)
        };
      }
      return photos;
    }
  };

})();
