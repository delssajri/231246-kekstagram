'use strict';

// Покажем форму кадрирования фотографии, если изменилось значение в поле #upload-file
// Найдем поле загрузки изображений
(function () {
  var formLoad = document.querySelector('.upload-form');
  var fileName = document.querySelector('#upload-file');
  // Найдем форму кадрирования
  var frameFoto = formLoad.querySelector('.upload-overlay');
  var btnClose = formLoad.querySelector('.upload-form-cancel');

  // При загрузки изображения появляется форма кадрирования
  fileName.addEventListener('change', function () {
    frameFoto.classList.remove('hidden');
  });

  window.form = {
    closeUpload: function () {
      frameFoto.classList.add('hidden');
    }
  }

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

  // var fotoComment = formLoad.querySelector('.upload-form-description');
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
})();