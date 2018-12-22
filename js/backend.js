'use strict';

(function () {

  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';
  var imgFilters = document.querySelector('.img-filters');

  var configureXhr = function (xhr, onLoad, onError) {
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === window.constant.STATUS_OK) {
        onLoad(xhr.response);
        imgFilters.classList.remove('img-filters--inactive');
      } else {
        onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = window.constant.TIMEOUT;
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    configureXhr(xhr, onLoad, onError);
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    configureXhr(xhr, onLoad, onError);
    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
    imgFilters : imgFilters
  };
})();
