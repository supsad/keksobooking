import {TypeMinPrices} from '../data.js';

const Price = {
  MAX_LENGTH: 1000000,
  REQUIRED: true,
};

const typeElement = document.querySelector('#type');
const priceElement = document.querySelector('#price');

priceElement.max = Price.MAX_LENGTH;
priceElement.required = Price.REQUIRED;

const syncValue = () => {
  let selectedType = typeElement.options[typeElement.selectedIndex].value.toUpperCase();

  // * 0 is not displayed, so it is converted to text
  if (selectedType === 'BUNGALOW') {
    TypeMinPrices['BUNGALOW'] = TypeMinPrices['BUNGALOW'].toString();
  }

  if (TypeMinPrices[selectedType]) {
    let priceValue = TypeMinPrices[selectedType];
    priceElement.min = priceValue;
    priceElement.placeholder = priceValue;
  }
};

export {typeElement as houseType, syncValue};
