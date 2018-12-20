'use strict';
(function () {
  /**
   * Генерация вставки из шаблона
   * @param {object} picData объект с фотографией и данными к ней
   * @return {Node} picture Нода
   */
  var renderPic = function (picData) {
    var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
    var picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = picData.url;
    picture.querySelector('.picture__img').id = picData.id;
    picture.querySelector('.picture__likes').textContent = picData.likes;
    picture.querySelector('.picture__comments').textContent = picData.comments.length;
    picture.setAttribute('tabindex', '0');
    return picture;
  };

  /**
   * Вставка миниатюр на страницу
   * @param {Array} pics массив миниатюр
   */
  var renderPicsIntoDOM = function (pics) {
    var fragmentPictures = document.createDocumentFragment();
    var pictureContainer = document.querySelector('.pictures');
    pics.forEach(function (pic) {
      fragmentPictures.appendChild(renderPic(pic));
    });
    pictureContainer.appendChild(fragmentPictures);
  };

  window.picsData = [];

  /**
   * Функция, срабатывающая при загрузке данных, которая записывает данные из json в массив и рендерит данные в DOM
   * @param {array} data массив данных
   */
  var onLoad = function (data) {
    window.picsData = data;
    window.picsDataCopy = window.picsData.slice();
    window.picsDataCopy.sort(function () {
      return Math.random() - 0.5;
    });
    window.picsDataCopy = window.picsDataCopy.slice(0 - 10);
    for (var i = 0; i < data.length; i++) {
      window.picsData[i]['id'] = i;
    }
    renderPicsIntoDOM(window.picsData);
  };
  /**
   * Функция, которая выводит ошибку при загрузке данных
   * @param {string} Ошибка
   */
  var onError = function () {
    var errorMessage = document.createElement('div');
    errorMessage.style.position = 'absolute';
    errorMessage.style.left = 0;
    errorMessage.style.right = 0;
    errorMessage.style.fontSize = '10px';
    errorMessage.id = 'msg';
    errorMessage.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    errorMessage.textContent = 'Ошибка загрузки данных!';
    document.body.insertAdjacentElement('afterbegin', errorMessage);
  };

  window.backend.load(onLoad, onError);

  var imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');

  /**
   * Сортировка по кол-ву комментариев у фотографии
   * @param {array} pics массив объектов с фотографиями
   * @return {array} pics отсортированный массив
   */
  var sortComments = function (pics) {
    return pics.slice().sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
  };

  var filterClickHandler = function (evt) {
    var picture = document.querySelector('.pictures');
    var pictures = picture.querySelectorAll('.picture');
    pictures.forEach(function (item) {
      picture.removeChild(item);
    });
    var target = evt.target;
    if (target.id === 'filter-popular') {
      window.debounce(function () {
        renderPicsIntoDOM(window.picsData);
      });
      return;
    } else if (target.id === 'filter-new') {
      window.debounce(function () {
        renderPicsIntoDOM(window.picsDataCopy);
      });
      return;
    }
    window.debounce(function () {
      renderPicsIntoDOM(sortComments(window.picsData));
    });
  };

  var filterButton = imgFilters.querySelectorAll('.img-filters__button');
  filterButton.forEach(function (button) {
    button.addEventListener('click', filterClickHandler);
    button.classList.remove('img-filters__button--active');
  });


  var selectedButton;
  imgFilters.onclick = function (evt) {
    var target = evt.target;

    if (target.tagName !== 'BUTTON') {
      return;
    }

    highlight(target);
  };

  var highlight = function (node) {
    if (selectedButton) {
      selectedButton.classList.remove('img-filters__button--active');
    }
    selectedButton = node;
    selectedButton.classList.add('img-filters__button--active');
  };
})();
