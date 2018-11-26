'use strict';

var numPics = 25;
var pictures = [];

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

var generateList = function () {

  /**
   * Генерация комментариев
   * @return {number} Число комментариев
   */
  var generateComments = function () {
    var commentsArr = [];
    commentsArr.length = Math.floor(Math.random() * 10);
    for (var i = 0; i < commentsArr.length; i++) {
      commentsArr[i] = comments[Math.floor(Math.random() * comments.length)];
    }
    return commentsArr;
  };

  var arr = [];
  for (var i = 0; i < numPics; i++) {
    arr[i] = i + 1;
  }

  for (var j = arr.length - 1; j > 0; j--) {
    var rand = Math.floor(Math.random() * (j + 1));
    var temp = arr[j];
    arr[j] = arr[rand];
    arr[rand] = temp;
  }

  /**
   * Создание объектов с фотографиями
   */
  for (var k = 0; k < numPics; k++) {
    pictures[k] = {
      url: 'photos/' + arr[k] + '.jpg',
      likes: Math.floor(Math.random() * 185) + 15,
      comments: generateComments(),
      description: descriptions[Math.floor(Math.random() * (descriptions.length - 1))]
    };
  }
  return pictures;
};

generateList();

var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var fragment = document.createDocumentFragment();

for (var j = 0; j < pictures.length; j++) {
  var picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = pictures[j].url;
  picture.querySelector('.picture__likes').textContent = pictures[j].likes;
  picture.querySelector('.picture__comments').textContent = pictures[j].comments.length;
  fragment.appendChild(picture);
}
var pictureContainer = document.querySelector('.pictures');
pictureContainer.appendChild(fragment);


var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
bigPicture.querySelector('.big-picture__img img').src = pictures[0].url;
bigPicture.querySelector('.likes-count').textContent = pictures[0].likes;
bigPicture.querySelector('.comments-count').textContent = pictures[0].comments.length;
bigPicture.querySelector('.social__caption').textContent = pictures[0].description;

var comment = document.querySelector('.social__comment');

while (document.querySelector('.social__comments').firstChild) {
  document.querySelector('.social__comments').removeChild(document.querySelector('.social__comments').firstChild);
}
fragment = document.createDocumentFragment();

for (var i = 0; i < pictures[0].comments.length; i++) {
  comment.querySelector('img').src = 'img/avatar-' + Math.ceil(Math.random() * 6) + '.svg';
  comment.querySelector('.social__text').textContent = pictures[0].comments[i];
  fragment.appendChild(comment.cloneNode(true));
}

document.querySelector('.social__comments').appendChild(fragment);
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');

