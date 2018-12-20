'use strict';
(function () {
  /**
   * Поиск повторяющихся тегов
   * @param {array} valuesArray Массив тегов
   * @return {boolean} Наличие повторяющихся тегов
   */
  var sortArray = function (valuesArray) {
    for (var i = 0; i < valuesArray.length; i++) {
      for (var j = i + 1; j < valuesArray.length; j++) {
        if (valuesArray[i].toLowerCase() === valuesArray[j].toLowerCase()) {
          return true;
        }
      }
    }
    return false;
  };

  window.sortArray = sortArray;

  var lastTimeout;
  window.debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, window.constant.DEBOUNCE_INTERVAL);
  };

})();
