import {INVALID_FOCUS} from './index.js';
import {getFormatTitleValue, getIndexNumeralDeclination} from '/js/util.js';

const UserAdvertisementTitle = {
  MIN_TITLE_LENGTH: 30,
  MAX_TITLE_LENGTH: 100,
};

// * [value % 10 === 1, 1 < value%10 < 5, 10 < value < 20]
const WORD_SYMBOL_TEMPLATE = ['символ', 'символа', 'символов'];

const getInflectedWordSymbol = (valueLength, stringsTemplate) => {
  const declensionIndex = getIndexNumeralDeclination(valueLength);
  return stringsTemplate[declensionIndex];
};

const onValidTitle = (evt) => {
  const inputTarget = evt.target;
  const trimInputTarget = getFormatTitleValue(inputTarget);
  const valueLength = trimInputTarget.length;
  const min = UserAdvertisementTitle.MIN_TITLE_LENGTH;
  const max = UserAdvertisementTitle.MAX_TITLE_LENGTH;
  let inflectedSymbol;

  inputTarget.style.outline = INVALID_FOCUS;

  if (valueLength <= min) {
    inflectedSymbol = getInflectedWordSymbol(min - valueLength, WORD_SYMBOL_TEMPLATE);
    inputTarget.setCustomValidity(`Нужно ввести ещё ${min - valueLength} ${inflectedSymbol}.`);
  } else if (valueLength >= max) {
    inflectedSymbol = getInflectedWordSymbol(valueLength - max, WORD_SYMBOL_TEMPLATE)
    inputTarget.setCustomValidity(`Удалите лишние ${valueLength - max} ${inflectedSymbol}.`);
  } else {
    inputTarget.style.outline = '';
    inputTarget.setCustomValidity('');
  }

  evt.target.reportValidity();
};

const onValidPrice = (evt) => {
  const priceElement = evt.target;
  priceElement.style.outline = INVALID_FOCUS;

  if (parseInt(priceElement.value) < priceElement.min) {
    priceElement.setCustomValidity(`Вы ввели слишком низкую стоимость.
    Введите сумму не ниже ${priceElement.min}`);
  } else if (parseInt(priceElement.value) > priceElement.max) {
    priceElement.setCustomValidity('Вы ввели слишком высокую стоимость.');
  } else {
    priceElement.style.outline = '';
    priceElement.setCustomValidity('');
  }
};

const isCapacityOptionInvalid = (capacity, roomValue, map) => {
  let isEnabled = true;

  for (let option of capacity.selectedOptions) {
    if (!option.disabled) {
      isEnabled = false;
      break;
    }
  }

  return isEnabled && !map[roomValue].includes(capacity.value);
};

const onValidCapacity = (capacity, roomsValue, roomCapacityMap) => {
  if (isCapacityOptionInvalid(capacity, roomsValue, roomCapacityMap)) {
    capacity.style.outline = INVALID_FOCUS;
    capacity.setCustomValidity('Выбрана недоступная опция.');
  } else {
    capacity.style.outline = '';
    capacity.setCustomValidity('');
  }

  capacity.reportValidity();
};

export {onValidTitle, onValidPrice, onValidCapacity};
