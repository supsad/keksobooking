import {syncOptionsHandler} from '../util.js';

const timeinSelect = document.querySelector('#timein');
const timeoutSelect = document.querySelector('#timeout');

const onSync = (evt) => {
  switch (evt.target) {
    case timeinSelect:
      syncOptionsHandler(timeinSelect, timeoutSelect);
      break;

    case timeoutSelect:
      syncOptionsHandler(timeoutSelect, timeinSelect);
      break;
  }
};

export {timeinSelect, timeoutSelect, onSync};
