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
  };

  btnClose.addEventListener('click', function () {
    window.form.closeUpload();
  });

  var fotoComment = formLoad.querySelector('.upload-form-description');
  fotoComment.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      event.stopPropagation();
    }
  });

  var showSlider = function (show) {
    var sliderView = document.querySelector('.upload-effect-level');
    if (show) {
      sliderView.classList.remove('hidden');
    } else {
      sliderView.classList.add('hidden');
    }
  };

  var applyFilterStyle = function (name) {
    var fotoPreview = formLoad.querySelector('.effect-image-preview');
    var effectName = 'effect-' + name;
    for (var i = 0; i < fotoEffect.length; i++) {
      for (var j = 0; j < knownEffect.length; j++) {
        fotoPreview.classList.remove(knownEffect[j]);
      }
      fotoPreview.classList.add(effectName);
      knownEffect.push('effect-' + fotoEffect[i].value);
    }
  };

  var activeFilter = 'none';
  var filterFunctions = {
    'none': {
      selectFilter: function () {
        showSlider(false);
        applyFilterStyle('none');
      },
      updateFilter: function (percents) {
      }
    },
    'chrome': {
      selectFilter: function () {
        showSlider(true);
        applyFilterStyle('chrome');
        updateFilter(20);
      },
      updateFilter: function (percents) {
        var fotoPreview = formLoad.querySelector('.effect-image-preview');
        fotoPreview.style.filter = 'grayscale(' + percents / 100 + ')';
      }
    },
    'sepia': {
      selectFilter: function () {
        showSlider(true);
        applyFilterStyle('sepia');
        updateFilter(20);
      },
      updateFilter: function (percents) {
        var fotoPreview = formLoad.querySelector('.effect-image-preview');
        fotoPreview.style.filter = 'sepia(' + percents / 100 + ')';
      }
    },
    'marvin': {
      selectFilter: function () {
        showSlider(true);
        applyFilterStyle('marvin');
        updateFilter(20);
      },
      updateFilter: function (percents) {
        var fotoPreview = formLoad.querySelector('.effect-image-preview');
        fotoPreview.style.filter = 'invert(' + percents + '%)';
      }
    },
    'phobos': {
      selectFilter: function () {
        showSlider(true);
        applyFilterStyle('phobos');
        updateFilter(20);
      },
      updateFilter: function (percents) {
        var fotoPreview = formLoad.querySelector('.effect-image-preview');
        fotoPreview.style.filter = 'blur(' + 3 * percents / 100 + 'px)';
      }
    },
    'heat': {
      selectFilter: function () {
        showSlider(true);
        applyFilterStyle('heat');
        updateFilter(20);
      },
      updateFilter: function (percents) {
        var fotoPreview = formLoad.querySelector('.effect-image-preview');
        fotoPreview.style.filter = 'brightness(' + 3 * percents / 100 + ')';
      }
    }
  };

  var activateFilter = function (name) {
    var filterFuncs = filterFunctions[name];
    activeFilter = name;
    filterFuncs.selectFilter(name);
  };

  var updateFilter = function (percents) {
    updateSliderView(percents);

    var filterFuncs = filterFunctions[activeFilter];
    filterFuncs.updateFilter(percents);
  };

  // Применим эффект к изображению
  var fotoEffect = formLoad.querySelectorAll('[name = "effect"]');
  var knownEffect = [];

  // Изменение масштаба изображения
  var fotoScale = formLoad.querySelector('.effect-image-preview');
  var updateFotoScale = function (value) {
    fotoScale.style.transform = 'scale(' + (value / 100) + ')';
  };

  window.initializeScale('.upload-resize-controls', updateFotoScale, 25, 100, 25, 100);

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

  // Будем изменять свойства изображений в зависимости от положения ползунка
  // Найдем объект DOM ползунок
  var slider = document.querySelector('.upload-effect-level-pin');
  var lineControl = document.querySelector('.upload-effect-level-line');
  var valueControl = document.querySelector('.upload-effect-level-val');

  var updateSliderView = function (percents) {
    var x = percents / 100 * lineControl.clientWidth;

    slider.style.left = x + 'px';
    valueControl.style.width = percents + '%';
  };

  slider.addEventListener('mousedown', function (event) {
    event.preventDefault();

    var xStart = event.clientX;

    var onMouseMove = function (moveEvent) {
      moveEvent.preventDefault();

      var xShift = moveEvent.clientX - xStart;
      var x = slider.offsetLeft + xShift;
      if (x < 0 || lineControl.clientWidth <= x) {
        return;
      }

      xStart = moveEvent.clientX;

      var percents = x / lineControl.clientWidth * 100;
      updateFilter(percents);
    };

    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var containerEffect = formLoad.querySelector('.upload-effect-controls');
  window.initializeFilters(containerEffect, activateFilter);

  var onSaved = function (response) {
    frameFoto.classList.add('hidden');
  };

  var onSaveError = function (status, error) {
    var uploadMessage = document.querySelector('.upload-message');
    var message = 'Неизвестная ошибка';
    switch (Math.floor(status / 100)) {
      case 3:
        message = 'Не удалось сохранить фото: изменился адрес сервера, обновите страницу';
        break;
      case 4:
        message = 'Не удалось сохранить фото: неверный формат запроса, обновите страницу';
        break;
      case 5:
        message = 'Не удалось сохранить фото: ошибка сервера';
        break;
    }
    uploadMessage.innerHTML = message;
    uploadMessage.style.zIndex = 1000;
    uploadMessage.classList.remove('hidden');
  };

  formLoad.addEventListener('submit', function (event) {
    var formData = new FormData(formLoad);
    window.backend.save(formData, onSaved, onSaveError);
    event.preventDefault();
  });
})();
