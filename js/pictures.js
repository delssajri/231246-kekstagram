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

var mkOnClickCallback = function (link, foto) {
  return function (event) {
    link.href = '#';
    event.stopPropagation();

    showPicture(foto);
  };
};

// Заполняем галлерею фотографиями, используя template
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

    var link = elementFoto.querySelector('a');
    link.addEventListener('click', mkOnClickCallback(link, foto[i]));

    fragment.appendChild(elementFoto);
  }
  galleryPictures.appendChild(fragment);

  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 27)  {
      closePicture();
      closeUpload();
    }
  });

  var closeElement = document.querySelector('.gallery-overlay-close');
  closeElement.addEventListener('click', function () {
    closePicture();
  });

  closeElement.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      closePicture();
    }
  });
};

// Добавляем в картинку url, количество комментарий и лайков
var configurePictureView = function (foto) {
  var galleryElement = document.querySelector('.gallery-overlay');
  var galleryImg = galleryElement.querySelector('img');

  galleryImg.setAttribute('src', foto.url);
  galleryElement.querySelector('.comments-count').textContent = foto.comments.length;
  galleryElement.querySelector('.likes-count').textContent = foto.likes;
};

// Функция показа фотографии
var showPicture = function (foto) {
  configurePictureView(foto);

  var galleryElement = document.querySelector('.gallery-overlay');
  galleryElement.classList.remove('hidden');
};

var closePicture = function () {
  var galleryElement = document.querySelector('.gallery-overlay');
  galleryElement.classList.add('hidden');
};

var fotos = generateTestFotos(setObjectLength, setСomments);
generateGalleryFoto(fotos);

// Покажем форму кадрирования фотографии, если изменилось значение в поле #upload-file

// Найдем поле загрузки изображений
var formLoad = document.querySelector('.upload-form');
var fileName = document.querySelector('#upload-file');
// Найдем форму кадрирования
var frameFoto = formLoad.querySelector('.upload-overlay');
var btnClose = formLoad.querySelector('.upload-form-cancel');

// При загрузки изображения появляется форма кадрирования
fileName.addEventListener('change', function () {
  frameFoto.classList.remove('hidden');
});

var closeUpload = function () {
  frameFoto.classList.add('hidden');
};

btnClose.addEventListener('click', function () {
  closeUpload();
});

var fotoComment = formLoad.querySelector('.upload-form-description');
fotoComment.addEventListener('keydown', function (event) {
  if (event.keyCode === 27) {
    event.stopPropagation();
  }
});

// Применим эффект к изображению
var fotoEffect = formLoad.querySelectorAll('[name = "effect"]');
var knownEffect = [];
var containerEffect = formLoad.querySelector('.upload-effect-controls');
containerEffect.addEventListener('change', function (event) {
  if (event.target.tagName !== '.effect-image-preview') {
    return;
  }
  var fotoPreview = formLoad.querySelector('.effect-image-preview');
  var effectName = 'effect-' + event.target.value;
  for (var i = 0; i < fotoEffect.length; i++) {
    for (var j = 0; j < knownEffect.length; j++) {
      fotoPreview.classList.remove(knownEffect[j]);
    }
    fotoPreview.classList.add(effectName);
    knownEffect.push('effect-' + fotoEffect[i].value);
  }
});
for (var i = 0; i < fotoEffect.length; i++) {
  fotoEffect[i].addEventListener('change', function (event) {
    var fotoPreview = formLoad.querySelector('.effect-image-preview');
    var effectName = 'effect-' + event.target.value;
    for (var j = 0; j < knownEffect.length; j++) {
      fotoPreview.classList.remove(knownEffect[j]);
    }
    fotoPreview.classList.add(effectName);
  });
  knownEffect.push('effect-' + fotoEffect[i].value);
}

// Изменение масштаба изображения
var buttonInc = formLoad.querySelector('.upload-resize-controls-button-inc');
var buttonDec = formLoad.querySelector('.upload-resize-controls-button-dec');
var fieldScale = formLoad.querySelector('.upload-resize-controls-value');
var fotoScale = formLoad.querySelector('.effect-image-preview');

var updateFotoScale = function (value) {
  var scale = parseInt(fieldScale.value, 10);
  var newScale = scale + value;
  if (newScale < 25 || newScale > 100) {
    return;
  }

  fieldScale.value = newScale + '%';
  var scaleElem = 'scale(' + (newScale / 100) + ')';
  fotoScale.style.transform = scaleElem;
};

buttonInc.addEventListener('click', function () {
  updateFotoScale(25);
});

buttonDec.addEventListener('click', function () {
  updateFotoScale(-25);
});

// Хеш-теги
var hashTag = formLoad.querySelector('.upload-form-hashtags');
var validateHashTag = function (hashTagValue) {
  if (hashTagValue.length === 0) {
    return true;
  }

  var nonemptyTags = hashTagValue.split(' ').filter(function (v) {
    return v.length ? true : false;
  });
  if (nonemptyTags.length === 0) {
    return true;
  }

  var onlyUnique = function (value, index, self) {
    return self.indexOf(value) === index;
  };

  var uniqueHashTags = nonemptyTags.filter(onlyUnique);
  if (uniqueHashTags.length > 5) {
    return false;
  }
  if (nonemptyTags.length !== uniqueHashTags.length) {
    return false;
  }
  var validTags = uniqueHashTags.filter(function (v) {
    if ((v.length < 2) || (v.length > 20)) {
      return false;
    }
    return v.startsWith('#');
  });
  return uniqueHashTags.length === validTags.length;
};

//var fotoComment = formLoad.querySelector('.upload-form-description');
var validateComment = function (comment) {
  return comment.length >= 30;
};

var highLightError = function (element, highlight) {
  if (highlight) {
    element.style.border = '1px solid red';
  } else {
    element.style.border = '';
  }
};

var validateForm = function () {
  var hashTagValid = validateHashTag(hashTag.value);
  highLightError(hashTag, !hashTagValid);

  var commentValid = validateComment(fotoComment.value);
  highLightError(fotoComment, !commentValid);

  return hashTagValid && commentValid;
};

formLoad.addEventListener('submit', function (event) {
  if (!validateForm()) {
    event.preventDefault();
  }
});
