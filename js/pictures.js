'use strict';

var NUM_PICS = 25;
var MAX_COMMENTS_IN_PICS = 10;

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
 * @return {{id: number, url: string, likes: number, comments: Array, description: string}}
 */
var generatePic = function (idPicture, maxComments) {
  return {
    id: idPicture,
    url: 'photos/' + idPicture + '.jpg',
    likes: Math.floor(Math.random() * 185) + 15,
    comments: generateComments(maxComments),
    description: descriptions[Math.floor(Math.random() * (descriptions.length - 1))]
  };
};

/**
 * Генерация массива объектов
 * @param {number} count количество генерируемых фотографий
 * @return {Array} массив фотографий
 */
var generatePics = function (count) {
  var pics = [];
  for (var i = 1; i <= count; i++) {
    pics[i] = generatePic(i, MAX_COMMENTS_IN_PICS);
  }
  return pics;
};

var renderPic = function (picData) {
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

var picsData = generatePics(NUM_PICS);

renderPicsIntoDOM(picsData);

var bigPicture = document.querySelector('.big-picture');
var img = document.querySelector('.img-upload__overlay');
var uploadFile = document.querySelector('#upload-file');

/**
 * Создание комментария для большой фотографии
 * @param {string} commentData параметр
 * @return {HTMLLIElement} HTML элемент 'li'
 */
var renderComment = function (commentData) {
  var socialComment = document.createElement('li');
  socialComment.classList.add('social__comment');
  var socialPicture = document.createElement('img');
  socialPicture.classList.add('social__picture');
  socialPicture.src = 'img/avatar-' + Math.ceil(Math.random() * 6) + '.svg';
  socialPicture.alt = 'Аватар комментатора фотографии';
  socialPicture.width = socialPicture.height = 35;
  socialComment.appendChild(socialPicture);
  var socialText = document.createElement('p');
  socialText.classList.add('social__text');
  socialText.textContent = commentData;
  socialComment.appendChild(socialText);
  return socialComment;
};

var commentsContainer = document.querySelector('.social__comments');
commentsContainer.innerHTML = '';

/**
 * Отрисовка комментариев для большой фотографии
 * @param {string} comm параметр
 */
var renderComments = function (comm) {
  var fragmentComments = document.createDocumentFragment();
  comm.forEach(function (comment) {
    fragmentComments.appendChild(renderComment(comment));
  });
  commentsContainer.appendChild(fragmentComments);
};

renderComments(picsData[1].comments);

uploadFile.addEventListener('change', function () {
  img.classList.remove('hidden');
});

var imgSlider = document.querySelector('.img-upload__effect-level ');
imgSlider.classList.add('hidden');

var imgUploadPreview = document.querySelector('.img-upload__preview');
imgUploadPreview.classList.remove('img-upload__preview');

// скрытие слайдера, если фотография без фильтра
var imgNone = document.querySelector('.effects__preview--none');
imgNone.addEventListener('click', function () {
  imgUploadPreview.className = 'effects__preview--none';
  if (imgNone.classList.contains('effects__preview--none')) {
    imgSlider.classList.add('hidden');
  } else {
    imgSlider.classList.remove('hidden');
  }
});

// добавление эффекта Хром
var imgChrome = document.querySelector('.effects__preview--chrome');
imgChrome.addEventListener('click', function () {
  imgUploadPreview.className = 'effects__preview--chrome';
  imgSlider.classList.remove('hidden');
});

// добавление эффекта Сепия
var imgSepia = document.querySelector('.effects__preview--sepia');
imgSepia.addEventListener('click', function () {
  imgUploadPreview.className = 'effects__preview--sepia';
  imgSlider.classList.remove('hidden');
});

// добавление эффекта Марвин
var imgMarvin = document.querySelector('.effects__preview--marvin');
imgMarvin.addEventListener('click', function () {
  imgUploadPreview.className = 'effects__preview--marvin';
  imgSlider.classList.remove('hidden');
});

// добавление эффекта Фобос
var imgPhobos = document.querySelector('.effects__preview--phobos');
imgPhobos.addEventListener('click', function () {
  imgUploadPreview.className = 'effects__preview--phobos';
  imgSlider.classList.remove('hidden');
});

// добавление эффекта Зной
var imgHeat = document.querySelector('.effects__preview--heat');
imgHeat.addEventListener('click', function () {
  imgUploadPreview.className = 'effects__preview--heat';
  imgSlider.classList.remove('hidden');
});

// кнопка закрытия окна редактирования фотографии
var imgUploadCancelButton = document.querySelector('.img-upload__cancel');

// закрытие загруженной фотографии по клику на кнопке "закрыть"
imgUploadCancelButton.addEventListener('click', function () {
  img.classList.add('hidden');

});

// закрытие загруженной фотографии по нажатию на ESC
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    img.classList.add('hidden');
  }
});

// Закрытие полноэкранного просмотра изображение по клику на кнопке "закрыть"
var bigPictureCancelButton = document.querySelector('.big-picture__cancel');
bigPictureCancelButton.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});

var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');

var MIN_VALUE = 25;
var MAX_VALUE = 100;
var JUMP_VALUE = 25;
var value = MAX_VALUE;

// уменьшение зума
scaleControlSmaller.addEventListener('click', function () {
  value = value - JUMP_VALUE;
  if (value < MIN_VALUE) {
    value = MIN_VALUE;
  }
  scaleControlValue.value = value + '%';
  imgUploadPreview.style.transform = 'scale(' + value / 100 + ')';
});

// увеличение зума
scaleControlBigger.addEventListener('click', function () {
  value = value + JUMP_VALUE;
  if (value > MAX_VALUE) {
    value = MAX_VALUE;
  }
  scaleControlValue.value = value + '%';
  imgUploadPreview.style.transform = 'scale(' + value / 100 + ')';
});

// показ большой фотографии
var clickOnImage = function (evt) {
  var target = evt.target;
  if (evt.target.classList.contains('picture__img')) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = target.getAttribute('src');
    bigPicture.querySelector('.likes-count').textContent = picsData[target.id].likes;
    bigPicture.querySelector('.comments-count').textContent = picsData[target.id].comments.length;
    bigPicture.querySelector('.social__caption').textContent = picsData[target.id].description;
  }
};

var imagesContainer = document.querySelector('.pictures');
imagesContainer.addEventListener('click', clickOnImage);
