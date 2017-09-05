'use strict';

(function () {
  var generateGalleryFoto = window.pictures.generateGalleryFoto;
  var closeUpload = window.form.closeUpload;
  generateGalleryFoto();
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
