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
 * @return {Array} Список комментариев
 */
var generateComments = function (maxComments) {
  var commentsArr = [];
  var maxCountComments = Math.ceil(Math.random() * maxComments);
  //commentsArr.length = Math.floor(Math.random() * MAX_COMMENTS_IN_PICS);
  for (var i = 0; i < maxCountComments; i++) {
    commentsArr[i] = comments[Math.floor(Math.random() * comments.length)];
  }
  return commentsArr;
};

var generatePic = function (idPicture, maxComments) {
  return {
    url: 'photos/' + idPicture + '.jpg',
    likes: Math.floor(Math.random() * 185) + 15,
    comments: generateComments(maxComments),
    description: descriptions[Math.floor(Math.random() * (descriptions.length - 1))]
  };
};

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
  // for (var i = 0; i < pics.length; i++) {
  //   //   fragment.appendChild(renderPic(pics[i]));
  //   // }
  pics.forEach(function (pic) {
    fragmentPictures.appendChild(renderPic(pic));
  });
  pictureContainer.appendChild(fragmentPictures);
};

var picsData = generatePics(NUM_PICS);

renderPicsIntoDOM(picsData);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

bigPicture.querySelector('.big-picture__img img').src = picsData[1].url;
bigPicture.querySelector('.likes-count').textContent = picsData[1].likes;
bigPicture.querySelector('.comments-count').textContent = picsData[1].comments.length;
bigPicture.querySelector('.social__caption').textContent = picsData[1].description;

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

var renderComments = function (comments) {
  var fragmentComments = document.createDocumentFragment();
  comments.forEach(function (comment) {
    fragmentComments.appendChild(renderComment(comment));
  });
  commentsContainer.appendChild(fragmentComments);
};

renderComments(picsData[1].comments);

// document.querySelector('.social__comments').appendChild(fragment);
// document.querySelector('.social__comment-count').classList.add('visually-hidden');
// document.querySelector('.comments-loader').classList.add('visually-hidden');

