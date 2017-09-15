'use strict';

(function () {
  var closeUpload = window.form.closeUpload;

  var fotosFromServer = null;

  var useTestFotoSet = false;
  var testFotosPerPage = 25;

  var preferenceFilter = 'recommend';

  var lastFilterUpdateTime = 0;
  var debounceInterval = 500;

  var shuffleArray = function (a) {
    var j;
    var x;
    var i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
  };

  var preferenceFilters = {
    'recommend': function (fotos) {
      return fotos;
    },
    'popular': function (fotos) {
      fotos = fotos.slice(0);
      return fotos.sort(function (a, b) {
        if (a.likes < b.likes) {
          return 1;
        }
        if (a.likes > b.likes) {
          return -1;
        }
        return 0;
      });
    },
    'discussed': function (fotos) {
      fotos = fotos.slice(0);
      return fotos.sort(function (a, b) {
        if (a.comments.length < b.comments.length) {
          return 1;
        }
        if (a.comments.length > b.comments.length) {
          return -1;
        }
        return 0;
      });
    },
    'random': function (fotos) {
      fotos = fotos.slice(0);
      fotos.filter(function (a) {
        var r = Math.random();
        return 0.1 < r;
      });
      shuffleArray(fotos);
      return fotos;
    }
  };

  var resetPreferenceFilter = function () {
    preferenceFilter = 'recommend';
  };

  var applyPreferenceFilter = function (fotos) {
    if (!preferenceFilter) {
      return fotos;
    }
    return preferenceFilters[preferenceFilter](fotos);
  };

  var showFilteredFotos = function (fotos) {
    fotos = applyPreferenceFilter(fotos);
    window.pictures.generateGalleryHtml(fotos);
  };

  var debounce = function (filterName) {
    if (filterName === preferenceFilter) {
      return false;
    }

    var curTime = new Date();
    var timeDelta = curTime - lastFilterUpdateTime;
    if (timeDelta < debounceInterval) {
      return false;
    }

    lastFilterUpdateTime = curTime;

    return true;
  };

  var activatePreference = function (filterName) {
    if (!fotosFromServer) {
      return;
    }

    if (!debounce(filterName)) {
      return;
    }

    preferenceFilter = filterName;
    showFilteredFotos(fotosFromServer);
  };

  var onFotosLoaded = function (fotos) {
    fotosFromServer = fotos;

    resetPreferenceFilter();
    showFilteredFotos(fotosFromServer);
  };

  var onLoadError = function (status, error) {
    window.location = 'https://htmlacademy.ru';
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

  var preferenceRadios = document.querySelectorAll('.filters-radio');
  for (var i = 0; i < preferenceRadios.length; i++) {
    preferenceRadios[i].addEventListener('change', function (event) {
      activatePreference(event.target.value);
    });
  }

})();
