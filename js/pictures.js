'use strict';

var fotosPerPage = 25;
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
    generateGalleryFoto: function () {
      var foto = generateTestFotos(fotosPerPage);
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
    }
  };
})();
