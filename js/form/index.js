import {syncOptionsHandler} from '../util.js';
import {syncRoomsCapacityHandler} from './input-sync.js';

const titleInput = document.querySelector('#title');
const timeinSelect = document.querySelector('#timein');
const timeoutSelect = document.querySelector('#timeout');
const roomNumberSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');

const onSync = (evt) => {
  switch (evt.target) {
    case timeinSelect:
      syncOptionsHandler(evt.target, timeoutSelect);
      break;

    case timeoutSelect:
      syncOptionsHandler(evt.target, timeinSelect);
      break;

    case roomNumberSelect:
    case capacitySelect:
      syncRoomsCapacityHandler(roomNumberSelect, capacitySelect);
      break;
  }
};

export {
  timeinSelect,
  timeoutSelect,
  roomNumberSelect,
  capacitySelect,
  titleInput,
  onSync
};
export {typeElement as houseType, syncValue as syncPrice} from './housing-type.js';
export {syncRoomsCapacityHandler} from './input-sync.js'
export {onValidTitle} from './validate-title.js';
