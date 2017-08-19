//Массив комментариев
setСomments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var setObjectLength = 25;

var generateComments = function(sampleComments) {
  var count = Math.random() > 0.5 ? 1 : 2;
  var comments = [];
  for (var i = 0; i < count; i++) {
    var randomComment = sampleComments[Math.floor(Math.random() * sampleComments.length)];
    comments.push(randomComment);
  }
  return comments;
};


var generateFotos = function(fotosCount, sampleComments) {
  var setObjects = [];

  for (var i = 0; i < fotosCount; i++) {
    objFoto = new Object(); // Создание объекта

    //Зададим объекту параметры
    objFoto.url = 'photos/' + (i + 1) +'.jpg';
    objFoto.likes = Math.floor(Math.random() * (200 - 15) + 15);
    objFoto.comments = generateComments(sampleComments);

    //Запишем объект в массив объектов
    setObjects.push(objFoto);
  }
  return setObjects;
}
  
  var fotos = generateFotos(setObjectLength, setСomments);
  var gallerys = document.querySelectorAll('.pictures');
  var template = document.querySelector('#picture-template').content; //Находим шаблон 


for (var i = 0; i < setObjectLength; i++) {
  elementFoto = template.cloneNode(true);
  elementFoto.querySelector('.picture-comments').textContent = fotos[i].comments;
  elementFoto.querySelector('.picture-likes').textContent = fotos[i].likes;
  var elem = elementFoto.querySelectorAll('img');
  elem[0].setAttribute('src', fotos[i].url);
  gallerys[0].appendChild(elementFoto);
}