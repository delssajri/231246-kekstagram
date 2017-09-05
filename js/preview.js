'use strict';

// Добавляем в картинку url, количество комментарий и лайков
(function () {
  var configurePictureView = function (foto) {
    var galleryElement = document.querySelector('.gallery-overlay');
    var galleryImg = galleryElement.querySelector('img');

    galleryImg.setAttribute('src', foto.url);
    galleryElement.querySelector('.comments-count').textContent = foto.comments.length;
    galleryElement.querySelector('.likes-count').textContent = foto.likes;
  };

  // Функция показа фотографии
  window.preview = {
    showPicture: function (foto) {
      configurePictureView(foto);
      var galleryElement = document.querySelector('.gallery-overlay');
      galleryElement.classList.remove('hidden');
    },
    closePicture: function () {
      var galleryElement = document.querySelector('.gallery-overlay');
      galleryElement.classList.add('hidden');
    }
  };
})();
