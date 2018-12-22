'use strict';
(function () {
  var MAX_DESCRIPTION_LENGTH = 140;
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;
  var JUMP_VALUE = 25;
  var DEFAULT_SCALE = 100;
  var DEFAULT_RIGHT = 453;
  var LEFT_EDGE = 0;
  var MAX_COUNT_HASHTAGS = 5;
  var DEFAULT_LEVEL_FILTER = 100;

  var HashtagLength = {
    MIN: 2,
    MAX: 20
  };

  var bodyTag = document.body;
  var img = document.querySelector('.img-upload__overlay');
  var uploadFile = document.querySelector('#upload-file');

  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var effectLevelValue = imgUploadEffectLevel.querySelector('.effect-level__value');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  effectLevelValue.value = DEFAULT_LEVEL_FILTER;

  /**
   * Валидация хэш-тегов
   * @param {string} evt событие (ввод тегов)
   */
  var textHashtagHandler = function (evt) {
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
      } else if (arrayTags.length > MAX_COUNT_HASHTAGS) {
        target.setCustomValidity('В форме должно быть не более 5 хеш-тегов');
        textHashtag.style.border = 'solid 2px red';
        return;
      } else if (window.sortArray(arrayTags)) {
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
  textHashtag.addEventListener('input', textHashtagHandler);

  /**
   * Валидация комментария
   * @param {string} evt событие (ввод комментария)
   */
  var textDescriptionHandler = function (evt) {
    var target = evt.target;
    var description = evt.target.value;
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      target.setCustomValidity('Длина комментария должна быть не более 140 символов');
      textDescription.style.border = 'solid 2px red';
      return;
    } else {
      target.setCustomValidity('');
      textDescription.style.border = '';
    }
  };

  var textDescription = document.querySelector('.text__description');
  textDescription.addEventListener('input', textDescriptionHandler);

  /**
   * Установка дефолтного значения зума
   */

  var preview = document.querySelector('.user-pic');

  uploadFile.addEventListener('change', function () {
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();
    var matches = window.constant.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }

    img.classList.remove('hidden');
    imgSlider.classList.add('hidden');
    bodyTag.classList.add('modal-open');
    var inputList = document.querySelectorAll('.effects__radio');
    inputList.forEach(function (effect) {
      effect.checked = false;
    });
    inputList[0].checked = true;
    scaleControlValue.value = DEFAULT_SCALE + '%';
    effectLevelValue.value = DEFAULT_LEVEL_FILTER;
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
    scaleControlValue.value = DEFAULT_SCALE + '%';
    scaleValue = MAX_SCALE_VALUE;
  };

  var imgPreviewHandler = function (evt) {
    bodyTag.classList.add('modal-open');
    var target = evt.target;
    switch (true) {
      case target.classList.contains('effects__preview--none'):
        imgUploadPreview.className = 'effects__preview--none';
        imgUploadPreview.removeAttribute('style');
        imgSlider.classList.add('hidden');
        scaleControlValue.value = DEFAULT_SCALE + '%';
        scaleValue = MAX_SCALE_VALUE;
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
    image.addEventListener('click', imgPreviewHandler);
  });

  var imgUploadCancelButton = document.querySelector('.img-upload__cancel');

  /**
   * Закрытие большой фотографии, слайдера и снятие фильтра
   */
  var uploadPictureHandler = function () {
    img.classList.add('hidden');
    bodyTag.classList.remove('modal-open');
    imgUploadPreview.className = 'effects__preview--none';
    imgUploadPreview.removeAttribute('style');
    imgSlider.classList.add('hidden');
    setDefalutEffectLevel();
    imgUploadSetting();
    scaleControlValue.value = DEFAULT_SCALE + '%';
    scaleValue = MAX_SCALE_VALUE;
  };

  /**
   * Закрытие загруженной фотографии по клику на кнопке "закрыть"
   */
  imgUploadCancelButton.addEventListener('click', uploadPictureHandler);

  /**
   * Закрытие загруженной фотографии по нажатию на ESC
   */
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constant.ESC_CODE && evt.target !== textHashtag && evt.target !== textDescription) {
      uploadPictureHandler();
      uploadFile.value = '';
      imgUploadPreview.className = 'effects__preview--none';
      imgUploadPreview.removeAttribute('style');
      imgSlider.classList.remove('hidden');
      setDefalutEffectLevel();
      imgUploadSetting();
      scaleControlValue.value = DEFAULT_SCALE + '%';
      scaleValue = MAX_SCALE_VALUE;
    }
  });

  var scaleControlValue = document.querySelector('.scale__control--value');

  /**
   * Уменьшение либо увеличение фотографии, в зависимости от нажатой кнопки
   * @param evt Событие (клик на кнопке +/-)
   */
  var scaleValue = MAX_SCALE_VALUE;
  var imgUploadScaleHandler = function (evt) {
    if (evt.target.classList.contains('scale__control--smaller')) {
      scaleValue = scaleValue - JUMP_VALUE;
      if (scaleValue < MIN_SCALE_VALUE) {
        scaleValue = MIN_SCALE_VALUE;
      }
    } else if (evt.target.classList.contains('scale__control--bigger')) {
      scaleValue = scaleValue + JUMP_VALUE;
      if (scaleValue > MAX_SCALE_VALUE) {
        scaleValue = MAX_SCALE_VALUE;
      }
    }
    setScaleValue();
  };

  var imgUploadScale = document.querySelector('.img-upload__scale');
  imgUploadScale.addEventListener('click', imgUploadScaleHandler);

  /**
   * Формирование значения зума
   */
  var setScaleValue = function () {
    scaleControlValue.value = scaleValue + '%';
    imgUploadPreview.style.transform = 'scale(' + scaleValue / DEFAULT_SCALE + ')';
  };

  /**
   * Установка слайдера и уровня фильтра по-умолчанию
   */
  var setDefalutEffectLevel = function () {
    effectLevelPin.style.left = DEFAULT_RIGHT + 'px';
    effectLevelDepth.style.width = DEFAULT_RIGHT + 'px';
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

      if (newLeftCoord < LEFT_EDGE) {
        newLeftCoord = LEFT_EDGE;
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

  var setTemplateStatus = function (status) {
    var template = document.querySelector('#' + status);
    var msg = template.content.querySelector('.' + status).cloneNode(true);
    var messageTitle = msg.querySelector('.' + status + '__title');
    var messageButton = msg.querySelector('.' + status + '__button');
    var close = msg.querySelector('.' + status + '__inner');

    if (status === 'error') {
      messageTitle.textContent = 'Ошибка отправки данных';
    } else {
      messageTitle.textContent = 'Данные успешно загружены';
    }
    document.querySelector('main').appendChild(msg);

    var closeElementHandler = function (evt) {
      var elem = evt.target;
      if (elem.classList.contains(status + '__button') || evt.keyCode === window.constant.ESC_CODE || elem === msg) {
        messageButton.removeEventListener('click', closeElementHandler);
        document.removeEventListener('click', closeElementHandler);
        document.removeEventListener('keyup', closeElementHandler);
        msg.removeEventListener('click', closeClickHandler);
        msg.parentElement.removeChild(msg);
      }
    };
    var closeClickHandler = function () {
      messageButton.removeEventListener('click', closeElementHandler);
      document.removeEventListener('click', closeElementHandler);
      document.removeEventListener('keyup', closeElementHandler);
      msg.removeEventListener('click', closeBlurHandler);

      msg.parentElement.removeChild(msg);

    };
    var closeBlurHandler = function () {
      close.addEventListener('focus', closeClickHandler);
    };
    msg.addEventListener('click', closeBlurHandler);
    messageButton.addEventListener('click', closeElementHandler);
    document.addEventListener('click', closeElementHandler);
    document.addEventListener('keyup', closeElementHandler);
  };

  var onLoad = function () {
    setTemplateStatus('success');
    img.classList.add('hidden');
    uploadFile.value = '';
    textHashtag.value = '';
    textDescription.value = '';
  };

  var onError = function () {
    setTemplateStatus('error');
    uploadFile.value = '';
  };

  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onLoad, onError);
    imgUploadPreview.className = 'effects__preview--none';
    imgUploadPreview.removeAttribute('style');
    img.classList.add('hidden');
    bodyTag.classList.remove('modal-open');
    imgSlider.classList.remove('hidden');
    setDefalutEffectLevel();
    scaleControlValue.value = DEFAULT_SCALE + '%';
    scaleValue = MAX_SCALE_VALUE;
    evt.preventDefault();
  });
})();
