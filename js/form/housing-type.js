import {TypeMinPrices} from '../data.js';

const typeElement = document.querySelector('#type');
const priceElement = document.querySelector('#price');

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
