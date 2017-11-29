'use strict';

var photosNumber = 25;
var urls = [];
for (var mainPhoto = 1; mainPhoto <= photosNumber; mainPhoto++) {
		urls[mainPhoto - 1] = 'photos/' + mainPhoto + '.jpg';
}

var minimumLikes = 15;
var maximumLikes = 200;
var minimumComments = 1;
var maximumComments = 2;
var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getRandomElement = function (arrayElements) {
  var indexElement = Math.floor(Math.random() * arrayElements.length);
  return arrayElements.splice(indexElement, 1);
};

var generateRandomNumber = function (minBorder, maxBorder) {
  return Math.floor(minBorder + Math.random() * (maxBorder - minBorder + 1));
};

var generateRandomSubarray = function (arrayElements, minNumber, maxNumber) {
  var arrayCopy = arrayElements.slice();
  var nElements = generateRandomNumber(minNumber, maxNumber);
  var newArray = [];
  for (var index = 0; index < Math.min(nElements, arrayCopy.length); index++) {
    newArray[index] = getRandomElement(arrayCopy);
  }
  return newArray;
};

var generateRandomPhoto = function () {
  return {
    url: getRandomElement(urls),
    likes: generateRandomNumber(minimumLikes, maximumLikes),
    comments: generateRandomSubarray(comments, minimumComments, maximumComments)
  };
};

var photos = [];
for (mainPhoto = 0; mainPhoto < photosNumber; mainPhoto++) {
  photos[mainPhoto] = generateRandomPhoto();
}

var renderPhoto = function (photo, template) {
  var photoElement = template.cloneNode(true);
  photoElement.querySelector('img').src = photo.url;
  photoElement.querySelector('.picture-likes').textContent = photo.likes;
  photoElement.querySelector('.picture-comments').textContent = photo.comments.length;
  return photoElement;
};

var pictureTemplate = document.querySelector('#picture-template').content;
var picturesBlock = document.querySelector('.pictures');
picturesBlock.appendChild(fillBlock(photos, renderPhoto, pictureTemplate));
galleryOverlay.classList.remove('hidden');

var galleryOverlay = document.querySelector('.gallery-overlay');
galleryOverlay.querySelector('img.gallery-overlay-image').src = photos[0].url;
galleryOverlay.querySelector('.likes-count').textContent = photos[0].likes;
galleryOverlay.querySelector('.comments-count').textContent = photos[0].comments.length;

var fillBlock = function (objectsArray, renderFunction, template) {
  var fragment = document.createDocumentFragment();
  for (var indexObject = 0; indexObject < objectsArray.length; indexObject++) {
    fragment.appendChild(renderFunction(objectsArray[indexObject], template));
  }
  return fragment;
};