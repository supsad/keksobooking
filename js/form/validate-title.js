import {getIndexNumeralDeclination} from '../util.js';

const UserAdvertisementTitle = {
  MIN_TITLE_LENGTH: 30,
  MAX_TITLE_LENGTH: 100,
};

// * [value % 10 === 1, 1 < value%10 < 5, 10 < value < 20]
const WORD_SYMBOL_TEMPLATE = ['символ', 'символа', 'символов']

const getInflectedWordSymbol = (valueLength, stringsTemplate) => {
  const declensionIndex = getIndexNumeralDeclination(valueLength);
  return stringsTemplate[declensionIndex];
};

const onValidTitle = (evt) => {
  const inputTarget = evt.target;
  const valueLength = evt.target.value.length;
  const min = UserAdvertisementTitle.MIN_TITLE_LENGTH;
  const max = UserAdvertisementTitle.MAX_TITLE_LENGTH;
  let inflectedSymbol;

  if (valueLength < min) {
    inflectedSymbol = getInflectedWordSymbol(min - valueLength, WORD_SYMBOL_TEMPLATE);
    inputTarget.setCustomValidity(`Нужно ввести ещё ${min - valueLength} ${inflectedSymbol}.`);
  } else if (valueLength > max) {
    inflectedSymbol = getInflectedWordSymbol(valueLength - max, WORD_SYMBOL_TEMPLATE)
    inputTarget.setCustomValidity(`Удалите лишние ${valueLength - max} ${inflectedSymbol}.`);
  } else {
    inputTarget.setCustomValidity('');
  }

  evt.target.reportValidity();
};

export {onValidTitle};
