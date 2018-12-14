'use strict';
(function () {
  var NUM_PICS = 25;
  /**
   * Вставка миниатюр на страницу
   * @param {Array} pics массив миниатюр
   */
  var renderPicsIntoDOM = function (pics) {
    var fragmentPictures = document.createDocumentFragment();
    var pictureContainer = document.querySelector('.pictures');
    pics.forEach(function (pic) {
      fragmentPictures.appendChild(window.renderPic(pic));
    });
    pictureContainer.appendChild(fragmentPictures);
  };

  window.picsData = window.generatePics(NUM_PICS);
  renderPicsIntoDOM(window.picsData);
})();
