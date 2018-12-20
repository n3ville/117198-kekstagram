'use strict';
(function () {

  var HashtagLength = {
    MIN: 2,
    MAX: 20
  };

  var img = document.querySelector('.img-upload__overlay');
  var uploadFile = document.querySelector('#upload-file');

  /**
   * Поиск повторяющихся тегов
   * @param {array} valuesArray Массив тегов
   * @return {boolean} Наличие повторяющихся тегов
   */
  var sortArray = function (valuesArray) {
    var isRepeatedValue = false;

    for (var i = 0; i < valuesArray.length; i++) {
      for (var j = i + 1; j < valuesArray.length; j++) {
        if (valuesArray[i].toLowerCase() === valuesArray[j].toLowerCase()) {
          isRepeatedValue = true;
        }
      }
    }
    return isRepeatedValue;
  };
  // почему-то eslint ругается на такую функцию (Expected to return a value at the end of function 'sortArray')

  // var sortArray = function (valuesArray) {
  //   for (var i = 0; i < valuesArray.length; i++) {
  //     for (var j = i + 1; j < valuesArray.length; j++) {
  //       if (valuesArray[i].toLowerCase() === valuesArray[j].toLowerCase()) {
  //         return true;
  //       }
  //     }
  //   }
  // };

  /**
   * Валидация хэш-тегов
   * @param {string} evt событие (ввод тегов)
   */
  var checkValidityTag = function (evt) {
    var target = evt.target;
    var stringTags = evt.target.value;
    var arrayTags = stringTags.split(' ');

    arrayTags.forEach(function (tag) {
      var tagSymbols = tag.split('');

      if (tagSymbols[0] !== '#' && tagSymbols.length > 0) {
        target.setCustomValidity('Хеш-тег должен начинаться с #');
        textHashtag.style.border = 'solid 2px red';
        return;
      } else if (tagSymbols.length > HashtagLength.MAX) {
        target.setCustomValidity('Длина хеш-тега должна быть не более 20 символов');
        textHashtag.style.border = 'solid 2px red';
        return;
      } else if (tagSymbols.length > 0 && tagSymbols.length < HashtagLength.MIN) {
        target.setCustomValidity('Длина хеш-тега должна быть не менее 2 символов');
        textHashtag.style.border = 'solid 2px red';
        return;
      } else if (arrayTags.length > window.constant.MAX_COUNT_HASHTAGS) {
        target.setCustomValidity('В форме должно быть не более 5 хеш-тегов');
        textHashtag.style.border = 'solid 2px red';
        return;
      } else if (sortArray(arrayTags)) {
        target.setCustomValidity('Хеш-теги не должны повторяться');
        textHashtag.style.border = 'solid 2px red';
        return;
      } else {
        target.setCustomValidity('');
        textHashtag.style.border = '';
      }
    });
  };

  var textHashtag = document.querySelector('.text__hashtags');
  textHashtag.addEventListener('input', checkValidityTag);

  /**
   * Валидация комментария
   * @param {string} evt событие (ввод комментария)
   */
  var checkValidityDescription = function (evt) {
    var target = evt.target;
    var description = evt.target.value;
    if (description.length > window.constant.MAX_DESCRIPTION_LENGTH) {
      target.setCustomValidity('Длина комментария должна быть не более 140 символов');
      textDescription.style.border = 'solid 2px red';
      return;
    } else {
      target.setCustomValidity('');
      textDescription.style.border = '';
    }
  };

  var textDescription = document.querySelector('.text__description');
  textDescription.addEventListener('input', checkValidityDescription);

  /**
   * Установка дефолтного значения зума
   */
  uploadFile.addEventListener('change', function () {
    img.classList.remove('hidden');
    scaleControlValue.value = window.constant.DEFAULT_SCALE + '%';
  });

  var imgSlider = document.querySelector('.img-upload__effect-level ');
  imgSlider.classList.add('hidden');

  var imgUploadPreview = document.querySelector('.img-upload__preview');
  imgUploadPreview.classList.remove('img-upload__preview');

  /**
   * Добавление эффектов к фотографиям
   * @param {string} evt Событие (клик по иконке фильтра)
   */
  var imgUploadSetting = function () {
    imgUploadPreview.removeAttribute('style');
    imgSlider.classList.remove('hidden');
    setDefalutEffectLevel();
    scaleControlValue.value = window.constant.DEFAULT_SCALE + '%';
    scaleValue = window.constant.MAX_SCALE_VALUE;
  };

  var onPreviewClick = function (evt) {
    var target = evt.target;
    switch (true) {
      case target.classList.contains('effects__preview--none'):
        imgUploadPreview.className = 'effects__preview--none';
        imgUploadPreview.removeAttribute('style');
        imgSlider.classList.add('hidden');
        scaleControlValue.value = window.constant.DEFAULT_SCALE + '%';
        scaleValue = window.constant.MAX_SCALE_VALUE;
        break;
      case target.classList.contains('effects__preview--chrome'):
        imgUploadPreview.className = 'effects__preview--chrome';
        imgUploadSetting();
        break;
      case target.classList.contains('effects__preview--sepia'):
        imgUploadPreview.className = 'effects__preview--sepia';
        imgUploadSetting();
        break;
      case target.classList.contains('effects__preview--marvin'):
        imgUploadPreview.className = 'effects__preview--marvin';
        imgUploadSetting();
        break;
      case target.classList.contains('effects__preview--phobos'):
        imgUploadPreview.className = 'effects__preview--phobos';
        imgUploadSetting();
        break;
      case target.classList.contains('effects__preview--heat'):
        imgUploadPreview.className = 'effects__preview--heat';
        imgUploadSetting();
        break;
    }
  };

  var imgPreview = document.querySelectorAll('.effects__item');
  imgPreview.forEach(function (image) {
    image.addEventListener('click', onPreviewClick);
  });

  var imgUploadCancelButton = document.querySelector('.img-upload__cancel');

  /**
   * Закрытие большой фотографии, слайдера и снятие фильтра
   */
  var hideUploadPicture = function () {
    img.classList.add('hidden');
    imgUploadPreview.className = 'effects__preview--none';
    imgSlider.classList.add('hidden');
  };

  /**
   * Закрытие загруженной фотографии по клику на кнопке "закрыть"
   */
  imgUploadCancelButton.addEventListener('click', function () {
    hideUploadPicture();
  });

  /**
   * Закрытие загруженной фотографии по нажатию на ESC
   */
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constant.ESC_CODE && evt.target !== textHashtag && evt.target !== textDescription) {
      hideUploadPicture();
    }
  });

  var scaleControlValue = document.querySelector('.scale__control--value');

  /**
   * Уменьшение либо увеличение фотографии, в зависимости от нажатой кнопки
   * @param evt Событие (клик на кнопке +/-)
   */
  var scaleValue = window.constant.MAX_SCALE_VALUE;
  var onScaleClick = function (evt) {
    if (evt.target.classList.contains('scale__control--smaller')) {
      scaleValue = scaleValue - window.constant.JUMP_VALUE;
      if (scaleValue < window.constant.MIN_SCALE_VALUE) {
        scaleValue = window.constant.MIN_SCALE_VALUE;
      }
    } else if (evt.target.classList.contains('scale__control--bigger')) {
      scaleValue = scaleValue + window.constant.JUMP_VALUE;
      if (scaleValue > window.constant.MAX_SCALE_VALUE) {
        scaleValue = window.constant.MAX_SCALE_VALUE;
      }
    }
    setScaleValue();
  };

  var imgUploadScale = document.querySelector('.img-upload__scale');
  imgUploadScale.addEventListener('click', onScaleClick);

  /**
   * Формирование значения зума
   */
  var setScaleValue = function () {
    scaleControlValue.value = scaleValue + '%';
    imgUploadPreview.style.transform = 'scale(' + scaleValue / window.constant.DEFAULT_SCALE + ')';
  };

  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  /**
   * Установка слайдера и уровня фильтра по-умолчанию
   */
  var setDefalutEffectLevel = function () {
    effectLevelPin.style.left = window.constant.DEFAULT_RIGHT + 'px';
    effectLevelDepth.style.width = window.constant.DEFAULT_RIGHT + 'px';
  };

  /**
   * Получение текущих координат
   * @param {string} evt
   * @return {{left: number}} Координата left
   */
  var getCoords = function (evt) {
    var coord = evt.getBoundingClientRect();

    return {
      left: coord.left + pageXOffset
    };
  };

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var lineCoords = getCoords(effectLevelLine);
    var pinCoords = getCoords(effectLevelPin);
    var shiftX = evt.pageX - pinCoords.left - (effectLevelPin.offsetWidth / 2);

    /**
     * Хэндлер на движение мыши
     * @param {string} moveEvt Событие движения мыши
     */
    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var newLeftCoord = moveEvt.pageX - shiftX - lineCoords.left;

      var rightEdge = effectLevelLine.offsetWidth;

      if (newLeftCoord < window.constant.LEFT_EDGE) {
        newLeftCoord = window.constant.LEFT_EDGE;
      }

      if (newLeftCoord > rightEdge) {
        newLeftCoord = rightEdge;
      }

      effectLevelPin.style.left = effectLevelDepth.style.width = newLeftCoord + 'px';
      effectLevelValue.value = Math.floor(newLeftCoord / effectLevelLine.offsetWidth * 100);
      var effectsPreviewChrome = document.querySelector('.effects__preview--chrome');
      var effectsPreviewSepia = document.querySelector('.effects__preview--sepia');
      var effectsPreviewMarvin = document.querySelector('.effects__preview--marvin');
      var effectsPreviewPhobos = document.querySelector('.effects__preview--phobos');
      var effectsPreviewHeat = document.querySelector('.effects__preview--heat');

      switch (true) {
        case imgUploadPreview.classList.contains('effects__preview--chrome'):
          effectsPreviewChrome.style.webkitFilter = 'grayscale(' + effectLevelValue.value / 100 + ')';
          break;

        case imgUploadPreview.classList.contains('effects__preview--sepia'):
          effectsPreviewSepia.style.webkitFilter = 'sepia(' + effectLevelValue.value / 100 + ')';
          break;

        case imgUploadPreview.classList.contains('effects__preview--marvin'):
          effectsPreviewMarvin.style.webkitFilter = 'invert(' + effectLevelValue.value + '%)';
          break;

        case imgUploadPreview.classList.contains('effects__preview--phobos'):
          effectsPreviewPhobos.style.webkitFilter = 'blur(' + (effectLevelValue.value * 3) / 100 + 'px)';
          break;

        case imgUploadPreview.classList.contains('effects__preview--heat'):
          effectsPreviewHeat.style.webkitFilter = 'brightness(' + (effectLevelValue.value * 2) / 100 + ')';
          break;
      }
    };

    /**
     * Хэндлер на отпускание кнопки мыши
     * @param {string} upEvt Событие отпускания кнопки мыши
     */
    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      img.classList.add('hidden');
    });
    evt.preventDefault();
  });
  var templateStatus = function (status) {
    var template = document.querySelector('#' + status);
    var msg = template.content.querySelector('.' + status).cloneNode(true);
    var messageTitle = msg.querySelector('.' + status + '__title');
    var messageButton = msg.querySelector('.' + status + '__button');
    if (status === 'error') {
      messageTitle.textContent = 'Ошибка отправки данных';
    } else {
      messageTitle.textContent = 'Данные успешно загружены';
    }
    document.querySelector('main').appendChild(msg);

    function closeElement(evt) {
      var elem = evt.target;
      if (elem.classList.contains(status + '__button') || evt.keyCode === window.constant.ESC_CODE || elem === msg) {
        messageButton.removeEventListener('click', closeElement);
        document.removeEventListener('click', closeElement);
        document.removeEventListener('keyup', closeElement);
        msg.removeEventListener('click', closeClickHandler);
        msg.parentElement.removeChild(msg);
      }
    }
    function closeClickHandler() {
      messageButton.removeEventListener('click', closeElement);
      document.removeEventListener('click', closeElement);
      document.removeEventListener('keyup', closeElement);
      msg.removeEventListener('click', closeBlurHandler);

      msg.parentElement.removeChild(msg);

    }
    function closeBlurHandler() {
      close.addEventListener('focus', closeClickHandler);
    }
    msg.addEventListener('click', closeBlurHandler);
    messageButton.addEventListener('click', closeElement);
    document.addEventListener('click', closeElement);
    document.addEventListener('keyup', closeElement);
  };

  var onLoad = function () {
    templateStatus('success');
    img.classList.add('hidden');
    uploadFile.value = '';
    textHashtag.value = '';
    textDescription.value = '';
  };

  var onError = function () {
    templateStatus('error');
  };
  document.querySelector('.img-upload__form').addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onLoad, onError);
    img.classList.add('hidden');
    evt.preventDefault();
  });
})();
