import {syncOptionsHandler} from '../util.js';

const timeinSelect = document.querySelector('#timein');
const timeoutSelect = document.querySelector('#timeout');

timeinSelect.addEventListener('change', function () {
  syncOptionsHandler(timeinSelect, timeoutSelect);
});

timeoutSelect.addEventListener('change', function () {
  syncOptionsHandler(timeoutSelect, timeinSelect);
});
