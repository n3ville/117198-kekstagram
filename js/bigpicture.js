'use strict';
(function () {
  var MAX_AVATARS = 6;
  var PICTURE_HEIGHT = 35;
  var MAX_COMMENTS = 5;

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
      fragmentComments.appendChild(renderComment(comment.message));
    });
    commentsContainer.appendChild(fragmentComments);
  };

  var bigPicture = document.querySelector('.big-picture');

  /**
   * Закрытие большой фотографии по нажатию на ESC
   */
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constant.ESC_CODE) {
      bigPicture.classList.add('hidden');
    }
  });

  /**
   * Закрытие большой фотографии по клику на кнопке "закрыть"
   */
  var bigPictureCancelButton = document.querySelector('.big-picture__cancel');
  bigPictureCancelButton.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });

  /**
   * Показ большой фотографии
   * @param {string} evt Событие (клик на миниатюре)
   */
  var imageClickHandler = function (evt) {
    var target = evt.target;
    if (target.classList.contains('picture__img')) {
      bigPicture.classList.remove('hidden');
      bigPicture.querySelectorAll('.social__comments').forEach(function (evnt) {
        evnt.innerHTML = '';
      });
      bigPicture.querySelector('.big-picture__img img').src = target.getAttribute('src');
      bigPicture.querySelector('.likes-count').textContent = window.picsData[target.id].likes;
      bigPicture.querySelector('.comments-count').textContent = window.picsData[target.id].comments.length;
      bigPicture.querySelector('.social__caption').textContent = window.picsData[target.id].description;
      renderComments((window.picsData[target.id].comments).slice(0, MAX_COMMENTS));
    }
  };

  /**
   * Показ большой фотографии
   * @param {string} evt Событие (нажатие клавиши)
   */
  var imageKeydownHandler = function (evt) {
    var target = evt.target;
    if (evt.keyCode === window.constant.ENTER_CODE) {
      bigPicture.classList.remove('hidden');
      bigPicture.querySelectorAll('.social__comments').forEach(function (evnt) {
        evnt.innerHTML = '';
      });
      bigPicture.querySelector('.big-picture__img img').src = target.childNodes[1].getAttribute('src');
      bigPicture.querySelector('.likes-count').textContent = window.picsData[target.childNodes[1].id].likes;
      bigPicture.querySelector('.comments-count').textContent = window.picsData[target.childNodes[1].id].comments.length;
      bigPicture.querySelector('.social__caption').textContent = window.picsData[target.childNodes[1].id].description;
      renderComments((window.picsData[target.childNodes[1].id].comments).slice(0, MAX_COMMENTS));
    }
  };

  var imagesContainer = document.querySelector('.pictures');
  imagesContainer.addEventListener('click', imageClickHandler);
  imagesContainer.addEventListener('keydown', imageKeydownHandler);
})();
