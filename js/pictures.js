'use strict';

var NUM_PICS = 25;
var MAX_COMMENTS_IN_PICS = 10;
var MIN_LIKES = 15;
var MAX_LIKES = 185;
var MAX_AVATARS = 6;
var PICTURE_HEIGHT = 35;
var ESC_CODE = 27;
var MIN_VALUE = 25;
var MAX_VALUE = 100;
var JUMP_VALUE = 25;
var DEFAULT_SCALE = 100;

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

var textHashtag = document.querySelector('.text__hashtags');
textHashtag.addEventListener('input', checkValidity);

/**
 * Поиск повторяющихся тегов
 * @param {array} valuesArray Массив тегов
 * @return {boolean} isRepeatedValue Наличие повторяющихся тегов
 */
function sortArray(valuesArray) {
  var isRepeatedValue = false;

  for (var i = 0; i < valuesArray.length; i++) {
    for (var j = i + 1; j < valuesArray.length; j++) {
      if (valuesArray[i].toLowerCase() === valuesArray[j].toLowerCase()) {
        isRepeatedValue = true;
      }
    }
  }

  return isRepeatedValue;
}

/**
 * Валидация хэш-тегов
 * @param {string} evt событие (ввод тегов)
 */
function checkValidity(evt) {
  var target = evt.target;
  var stringTags = evt.target.value;
  var arrayTags = stringTags.split(' ');

  for (var i = 0; i < arrayTags.length; i++) {
    var tag = arrayTags[i];
    var tagSymbols = tag.split('');

    if (tagSymbols[0] !== '#') {
      target.setCustomValidity('Хеш-тег должен начинаться с #');
    } else if (tagSymbols.length > 20) {
      target.setCustomValidity('Длина хеш-тега должна быть не более 20 символов');
    } else if (tagSymbols.length > 0 && tagSymbols.length < 2) {
      target.setCustomValidity('Длина хеш-тега должна быть не менее 2 символов');
    } else if (arrayTags.length > 5) {
      target.setCustomValidity('В форме должно быть не более 5 хеш-тегов');
    } else if (sortArray(arrayTags)) {
      target.setCustomValidity('Хеш-теги не должны повторяться');
    } else {
      target.setCustomValidity('');
    }
  }
}

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
var generatePics = function (count) {
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
 * Отрисовка комментария для большой фотографии
 * @param {string} commentData комментарий
 * @return {HTMLLIElement} HTML элемент 'li'
 */
var renderComment = function (commentData) {
  var socialComment = document.createElement('li');
  socialComment.classList.add('social__comment');
  var socialPicture = document.createElement('img');
  socialPicture.classList.add('social__picture');
  socialPicture.src = 'img/avatar-' + Math.ceil(Math.random() * MAX_AVATARS) + '.svg';
  socialPicture.alt = 'Аватар комментатора фотографии';
  socialPicture.width = socialPicture.height = PICTURE_HEIGHT;
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
 * @param {string} commentaries массив комментариев для каждой фотографии
 */
var renderComments = function (commentaries) {
  var fragmentComments = document.createDocumentFragment();
  commentaries.forEach(function (comment) {
    fragmentComments.appendChild(renderComment(comment));
  });
  commentsContainer.appendChild(fragmentComments);
};

/**
 * Установка дефолтного значения зума
 */
uploadFile.addEventListener('change', function () {
  img.classList.remove('hidden');
  scaleControlValue.value = DEFAULT_SCALE + '%';
});

var imgSlider = document.querySelector('.img-upload__effect-level ');
imgSlider.classList.add('hidden');

var imgUploadPreview = document.querySelector('.img-upload__preview');
imgUploadPreview.classList.remove('img-upload__preview');

/**
 * Добавление эффектов к фотографиям
 * @param {string} evt Событие (клик по иконке фильтра)
 */
var onPreviewClick = function (evt) {
  var target = evt.target;
  if (target.classList.contains('effects__preview--none')) {
    imgUploadPreview.className = 'effects__preview--none';
    imgSlider.classList.add('hidden');
  } else if (evt.target.classList.contains('effects__preview--chrome')) {
    imgUploadPreview.className = 'effects__preview--chrome';
    imgSlider.classList.remove('hidden');
  } else if (evt.target.classList.contains('effects__preview--sepia')) {
    imgUploadPreview.className = 'effects__preview--sepia';
    imgSlider.classList.remove('hidden');
  } else if (evt.target.classList.contains('effects__preview--marvin')) {
    imgUploadPreview.className = 'effects__preview--marvin';
    imgSlider.classList.remove('hidden');
  } else if (evt.target.classList.contains('effects__preview--phobos')) {
    imgUploadPreview.className = 'effects__preview--phobos';
    imgSlider.classList.remove('hidden');
  } else if (evt.target.classList.contains('effects__preview--heat')) {
    imgUploadPreview.className = 'effects__preview--heat';
    imgSlider.classList.remove('hidden');
  }
};

var imgPreview = document.querySelectorAll('.effects__item');
for (var i = 0; i < imgPreview.length; i++) {
  var image = imgPreview[i];
  image.addEventListener('click', onPreviewClick);
}

var imgUploadCancelButton = document.querySelector('.img-upload__cancel');

/**
 * Закрытие загруженной фотографии по клику на кнопке "закрыть"
 */
imgUploadCancelButton.addEventListener('click', function () {
  img.classList.add('hidden');
});

/**
 * Закрытие загруженной фотографии по нажатию на ESC
 */
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_CODE) {
    if (evt.target !== textHashtag) {
      img.classList.add('hidden');
    }
  }
});

/**
 * Закрытие большой фотографии по нажатию на ESC
 */
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_CODE) {
    bigPicture.classList.add('hidden');
  }
});

/**
 * Закрытие полноэкранного просмотра изображение по клику на кнопке "закрыть"
 */
var bigPictureCancelButton = document.querySelector('.big-picture__cancel');
bigPictureCancelButton.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});
var scaleControlValue = document.querySelector('.scale__control--value');

/**
 * Уменьшение либо увеличение фотографии, в зависимости от нажатой кнопки
 * @param evt Событие (клик на кнопке +/-)
 */
var value = MAX_VALUE;
var onScaleClick = function (evt) {
  if (evt.target.classList.contains('scale__control--smaller')) {
    value = value - JUMP_VALUE;
    if (value < MIN_VALUE) {
      value = MIN_VALUE;
    }
    setScaleValue();
  } else if (evt.target.classList.contains('scale__control--bigger')) {
    value = value + JUMP_VALUE;
    if (value > MAX_VALUE) {
      value = MAX_VALUE;
    }
    setScaleValue();
  }
};

var imgUploadScale = document.querySelector('.img-upload__scale');
imgUploadScale.addEventListener('click', onScaleClick);

/**
 * Формирование значения зума
 */
var setScaleValue = function () {
  scaleControlValue.value = value + '%';
  imgUploadPreview.style.transform = 'scale(' + value / DEFAULT_SCALE + ')';
};

/**
 * Показ большой фотографии
 * @param {string} evt Событие (клик на миниатюре)
 */
var onImageClick = function (evt) {
  var target = evt.target;
  if (evt.target.classList.contains('picture__img')) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelectorAll('.social__comment').forEach(function (e) {
      e.parentNode.removeChild(e);
    });
    bigPicture.querySelector('.big-picture__img img').src = target.getAttribute('src');
    bigPicture.querySelector('.likes-count').textContent = picsData[target.id].likes;
    bigPicture.querySelector('.comments-count').textContent = picsData[target.id].comments.length;
    bigPicture.querySelector('.social__caption').textContent = picsData[target.id].description;
    renderComments(picsData[target.id].comments);
  }
};

var imagesContainer = document.querySelector('.pictures');
imagesContainer.addEventListener('click', onImageClick);
