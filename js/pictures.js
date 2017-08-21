'use strict';

var setСomments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var setObjectLength = 25;

var generateTestComments = function (sampleComments) {
  var count = Math.random() > 0.5 ? 1 : 2;
  var comments = [];
  for (var i = 0; i < count; i++) {
    var randomComment = sampleComments[Math.floor(Math.random() * sampleComments.length)];
    comments.push(randomComment);
  }
  return comments;
};

var generateTestFotos = function (fotosCount, sampleComments) {
  var setObjects = [];

  for (var i = 0; i < fotosCount; i++) {
    var objFoto = {}; // Создание объекта

    // Зададим объекту параметры
    objFoto.url = 'photos/' + (i + 1) + '.jpg';
    objFoto.likes = Math.floor(Math.random() * (200 - 15) + 15);
    objFoto.comments = generateTestComments(sampleComments);

    // Запишем объект в массив объектов
    setObjects.push(objFoto);
  }
  return setObjects;
};

var generateGalleryFoto = function (foto) {
  var template = document.querySelector('#picture-template').content;
  var fragment = document.createDocumentFragment();
  var galleryPictures = document.querySelector('.pictures');

  for (var i = 0; i < foto.length; i++) {
    var elementFoto = template.cloneNode(true);
    var elem = elementFoto.querySelector('img');
    elem.setAttribute('src', foto[i].url);
    elementFoto.querySelector('.picture-comments').textContent = foto[i].comments;
    elementFoto.querySelector('.picture-likes').textContent = foto[i].likes;
    fragment.appendChild(elementFoto);
  }

  galleryPictures.appendChild(fragment);
};

var configurePictureView = function (foto) {
  var galleryElement = document.querySelector('.gallery-overlay');
  var galleryImg = galleryElement.querySelector('img');

  galleryImg.setAttribute('src', foto.url);
  galleryElement.querySelector('.comments-count').textContent = foto.comments;
  galleryElement.querySelector('.likes-count').textContent = foto.likes;
};

var showPicture = function (foto) {
  configurePictureView(foto);

  var galleryElement = document.querySelector('.gallery-overlay');
  galleryElement.classList.remove('hidden');
};

// var hidePicture = function () {
//   var galleryElement = document.querySelector('.gallery-overlay');
//   galleryElement.classList.add('hidden');
// };

var fotos = generateTestFotos(setObjectLength, setСomments);
generateGalleryFoto(fotos);
showPicture(fotos[0]);
