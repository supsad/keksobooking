import {syncOptionsHandler} from '../util.js';

const timeinSelect = document.querySelector('#timein');
const timeoutSelect = document.querySelector('#timeout');

const onSync = (event) => {
  if (event.target === timeinSelect) {
    syncOptionsHandler(timeinSelect, timeoutSelect);
  } else if (event.target === timeoutSelect) {
    syncOptionsHandler(timeoutSelect, timeinSelect);
  }
};

export {timeinSelect, timeoutSelect, onSync};
