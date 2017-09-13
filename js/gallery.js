'use strict';

(function () {
  var closeUpload = window.form.closeUpload;

  var useTestFotoSet = false;
  var testFotosPerPage = 25;

  var onFotosLoaded = function (fotos) {
    window.pictures.generateGalleryFoto(fotos);
  };

  var onLoadError = function (status, error) {
    window.location = "https://htmlacademy.ru";
  };

  var loadTestFotos = function (onLoad) {
    var fotos = window.generateTestFotos(testFotosPerPage);
    onLoad(fotos);
  };

  var loadFotosFromServer = function (onLoad) {
    window.backend.load(onLoad, onLoadError);
  };

  if (useTestFotoSet) {
    loadTestFotos(onFotosLoaded);
  } else {
    loadFotosFromServer(onFotosLoaded);
  }

  var closePicture = function () {
    var galleryElement = document.querySelector('.gallery-overlay');
    galleryElement.classList.add('hidden');
  };

  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
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
})();
