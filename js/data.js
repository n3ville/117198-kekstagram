'use strict';
(function () {
  var MAX_COMMENTS_IN_PICS = 10;
  var MIN_LIKES = 15;
  var MAX_LIKES = 185;

  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var descriptions = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  /**
   * Генерация комментариев
   * @param {number} maxComments Максимальное число комментариев
   * @return {Array} Список комментариев
   *
   */
  var generateComments = function (maxComments) {
    var commentsArr = [];
    var maxCountComments = Math.ceil(Math.random() * maxComments);
    for (var i = 0; i < maxCountComments; i++) {
      commentsArr[i] = comments[Math.floor(Math.random() * comments.length)];
    }
    return commentsArr;
  };

  /**
   * Генерация объекта с фотографией и данными
   * @param {number} idPicture Номер фотографии
   * @param {number} maxComments Максимальное число комментариев
   * @return {{id: number, url: string, likes: number, comments: Array, description: string}} номер, ссылка, число лайков, массив комментариев, описание
   */
  var generatePic = function (idPicture, maxComments) {
    return {
      id: idPicture,
      url: 'photos/' + idPicture + '.jpg',
      likes: Math.floor(Math.random() * MAX_LIKES) + MIN_LIKES,
      comments: generateComments(maxComments),
      description: descriptions[Math.floor(Math.random() * (descriptions.length - 1))]
    };
  };

  /**
   * Генерация массива объектов
   * @param {number} count количество генерируемых фотографий
   * @return {Array} массив фотографий
   */
  window.generatePics = function (count) {
    var pics = [];
    for (var i = 1; i <= count; i++) {
      pics[i] = generatePic(i, MAX_COMMENTS_IN_PICS);
    }
    return pics;
  };

  /**
   * Генерация вставки из шаблона
   * @param {object} picData объект с фотографией и данными к ней
   * @return {Node} picture Нода
   */
  window.renderPic = function (picData) {
    var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
    var picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = picData.url;
    picture.querySelector('.picture__img').id = picData.id;
    picture.querySelector('.picture__likes').textContent = picData.likes;
    picture.querySelector('.picture__comments').textContent = picData.comments.length;
    return picture;
  };
})();
