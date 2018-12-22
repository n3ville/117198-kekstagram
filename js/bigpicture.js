'use strict';
(function () {
  var MAX_AVATARS = 6;
  var PICTURE_HEIGHT = 35;
  var MAX_COMMENTS = 5;

  window.bodyTag = document.body;

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
  var commentsLoader = document.querySelector('.social__comments-loader');

  /**
   * Закрытие большой фотографии по нажатию на ESC
   */
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constant.ESC_CODE) {
      bigPicture.classList.add('hidden');
      window.bodyTag.classList.remove('modal-open');
      commentsLoader.removeEventListener('click', showCommentsHandler);
    }
  });

  /**
   * Закрытие большой фотографии по клику на кнопке "закрыть"
   */
  var bigPictureCancelButton = document.querySelector('.big-picture__cancel');
  bigPictureCancelButton.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
    window.bodyTag.classList.remove('modal-open');
    commentsLoader.removeEventListener('click', showCommentsHandler);
  });
  /**
   * Показ большой фотографии
   * @param {string} target фотография
   */
  var showBigPicture = function (target) {
    bigPicture.setAttribute('tabindex', 0);
    bigPicture.focus();
    commentsLoader.classList.remove('hidden');
    window.bodyTag.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    bigPicture.querySelectorAll('.social__comments').forEach(function (evnt) {
      evnt.innerHTML = '';
    });
    bigPicture.querySelector('.big-picture__img img').src = target.getAttribute('src');
    bigPicture.querySelector('.likes-count').textContent = window.picsData[target.id].likes;
    bigPicture.querySelector('.comments-count').textContent = window.picsData[target.id].comments.length;
    if (window.picsData[target.id].comments.length <= MAX_COMMENTS) {
      bigPicture.querySelector('.comments-number').textContent = window.picsData[target.id].comments.length;
    } else {
      bigPicture.querySelector('.comments-number').textContent = MAX_COMMENTS;
    }
    bigPicture.querySelector('.social__caption').textContent = window.picsData[target.id].description;
    window.arrayComments = window.picsData[target.id].comments.slice(0);
    renderComments((window.arrayComments).splice(0, MAX_COMMENTS));

    window.offsetComments = 0;

    if (window.arrayComments.length <= 0) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.addEventListener('click', showCommentsHandler);
    }

  };

  /**
   * Загрузка дополнительных комментариев
   */
  var showCommentsHandler = function () {
    var commentsForRender = (window.arrayComments).splice(0, MAX_COMMENTS);
    window.offsetComments += commentsForRender.length;
    bigPicture.querySelector('.comments-number').textContent = window.offsetComments + MAX_COMMENTS;
    renderComments(commentsForRender);
    if (window.arrayComments.length <= 0) {
      commentsLoader.classList.add('hidden');
    }
  };

  /**
   * Показ большой фотографии
   * @param {string} evt Событие (клик на миниатюре)
   */
  var imageClickHandler = function (evt) {
    var target = evt.target;
    if (target.classList.contains('picture__img')) {
      showBigPicture(target);
    }
  };

  var commenCount = document.querySelector('.social__comment-count');
  var commentNumber = document.createElement('span');
  commentNumber.className = 'comments-number';
  commenCount.insertBefore(commentNumber, commenCount.firstChild);

  /**
   * Показ большой фотографии
   * @param {string} evt Событие (нажатие клавиши)
   */
  var imageKeydownHandler = function (evt) {
    var target = evt.target;
    if (evt.keyCode === window.constant.ENTER_CODE && target.classList.contains('picture') && bigPicture.classList.contains('hidden')) {
      showBigPicture(target.childNodes[1]);
    }
  };

  var imagesContainer = document.querySelector('.pictures');
  imagesContainer.addEventListener('click', imageClickHandler);
  imagesContainer.addEventListener('keydown', imageKeydownHandler);
})();
