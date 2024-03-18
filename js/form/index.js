import {syncRoomsCapacityHandler} from './input-sync.js';
import {sendUserAnnouncementData} from '/js/api.js';
import {page, renderErrorAlert} from '/js/render-page/index.js';
import {getFormatTitleValue, syncOptionsHandler} from '/js/util.js';

const INVALID_FOCUS = `${2}px solid #E52B50`;

const ERROR_MESSAGE = [
  'Упс! Что-то пошло не так!',
  'Не удалось отправить ваше объявление!',
  'Попробуйте перезагрузить страницу.',
];

const Forms = {
  form: document.querySelector('.ad-form'),
  filters: document.querySelector('.map__filters'),
};

const titleInput = Forms.form.querySelector('#title');
const address = document.querySelector('#address');
const timeinSelect = Forms.form.querySelector('#timein');
const timeoutSelect = Forms.form.querySelector('#timeout');
const roomNumberSelect = Forms.form.querySelector('#room_number');
const capacitySelect = Forms.form.querySelector('#capacity');
const houseTypeSelect = Forms.form.querySelector('#type');
const housePriceInput = Forms.form.querySelector('#price');
const resetFormButton = Forms.form.querySelector('button[type=reset]');

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

const setUserFormSubmit = (onSuccess) => {
  Forms.form.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    titleInput.value = getFormatTitleValue(titleInput);
    await sendUserAnnouncementData(
      new FormData(evt.target),
      () => onSuccess(),
      () => renderErrorAlert(page, ERROR_MESSAGE),
    );
  });
};

export {
  INVALID_FOCUS,
  Forms,
  address,
  timeinSelect,
  timeoutSelect,
  roomNumberSelect,
  capacitySelect,
  titleInput,
  houseTypeSelect,
  housePriceInput,
  resetFormButton,
  onSync,
  setUserFormSubmit
};
export {onValidTitle, onValidPrice, onValidCapacity} from './validation.js';
export {syncRoomsCapacityHandler, houseSyncPrice, setPriceInputAttr, setAddressInput} from './input-sync.js';
export {resetPage} from './reset.js';
