'use strict';

(function () {
  var setСomments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  window.generateTestComments = function () {
    var count = Math.random() > 0.5 ? 1 : 2;
    var comments = [];
    for (var i = 0; i < count; i++) {
      var randomComment = setСomments[Math.floor(Math.random() * setСomments.length)];
      comments.push(randomComment);
    }
    return comments;
  };
  window.generateTestFotos = function (setObjectLength) {
    var setObjects = [];
    for (var i = 0; i < setObjectLength; i++) {
      var objFoto = {}; // Создание объекта
      // Зададим объекту параметры
      objFoto.url = 'photos/' + (i + 1) + '.jpg';
      objFoto.likes = Math.floor(Math.random() * (200 - 15) + 15);
      objFoto.comments = window.generateTestComments();
      setObjects.push(objFoto);
    }
    return setObjects;
  };
})();
