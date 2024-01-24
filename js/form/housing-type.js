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
  const bungalowKey = Object.keys(TypeMinPrices).find((key) => key === 'BUNGALOW');

  // * 0 is not displayed, so it is converted to text
  if (selectedType === bungalowKey) {
    TypeMinPrices[bungalowKey] = TypeMinPrices[bungalowKey].toString();
  }

  if (TypeMinPrices[selectedType]) {
    let priceValue = TypeMinPrices[selectedType];
    priceElement.min = priceValue;
    priceElement.placeholder = priceValue;
  }
};

export {typeElement as houseType, syncValue};
