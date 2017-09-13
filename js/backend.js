'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (Math.floor(xhr.status / 100) === 2) {
          onLoad(xhr.response);
        } else {
          onError(xhr.status, xhr.statusText);
        }
      });

      var URL = 'https://1510.dump.academy/kekstagram/data';
      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
      	console.log(xhr.status);
        if (Math.floor(xhr.status / 100) === 2) {
          onLoad(xhr.response);
        } else {
          onError(xhr.status, xhr.statusText);
        }
      });

      var URL = 'https://1510.dump.academy/kekstagram';
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();

