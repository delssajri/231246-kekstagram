'use strict';

(function () {

  window.initializeScale = function (scaleElementClass, adjustScale, step, defScale, minScale, maxScale) {
    step = step || 25;
    defScale = defScale || 100;
    minScale = minScale || 25;
    maxScale = maxScale || 100;

    var value = defScale;

    var resizeControl = document.querySelector(scaleElementClass);
    var buttonDec = resizeControl.querySelector(scaleElementClass + '-button-dec');
    var buttonInc = resizeControl.querySelector(scaleElementClass + '-button-inc');
    var textScale = resizeControl.querySelector(scaleElementClass + '-value');

    var updateScale = function (diff) {
      var newValue = value + diff;
      if (newValue < minScale || maxScale < newValue) {
        return;
      }

      value = newValue;
      textScale.value = value + '%';
      adjustScale(value);
    };

    buttonDec.addEventListener('click', function () {
      updateScale(-step);
    });

    buttonInc.addEventListener('click', function () {
      updateScale(step);
    });

    updateScale(0);
  };
})();
