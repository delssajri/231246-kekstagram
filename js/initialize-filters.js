'use strict';

(function () {

  window.initializeFilters = function (filterElement, applyFilter) {
    filterElement.addEventListener('change', function (event) {
      applyFilter(event.target.value);
    });

    applyFilter('none');
  };
})();