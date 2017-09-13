'use strict';

var showPicture = window.preview.showPicture;

(function () {
  var mkOnClickCallback = function (link, foto) {
    return function (event) {
      link.href = '#';
      event.stopPropagation();

      showPicture(foto);
    };
  };

  // Заполняем галлерею фотографиями, используя template
  window.pictures = {
    generateGalleryFoto: function (fotos) {
      // var foto = window.generateTestFotos(fotosPerPage);
      var template = document.querySelector('#picture-template').content;
      var fragment = document.createDocumentFragment();
      var galleryPictures = document.querySelector('.pictures');

      for (var i = 0; i < fotos.length; i++) {
        var elementFoto = template.cloneNode(true);
        var elem = elementFoto.querySelector('img');
        elem.setAttribute('src', fotos[i].url);
        elementFoto.querySelector('.picture-comments').textContent = fotos[i].comments;
        elementFoto.querySelector('.picture-likes').textContent = fotos[i].likes;

        var link = elementFoto.querySelector('a');
        link.addEventListener('click', mkOnClickCallback(link, fotos[i]));

        fragment.appendChild(elementFoto);
      }
      galleryPictures.appendChild(fragment);
    }
  };
})();
