import {TypeMinPrices} from '../data.js';

const type = document.querySelector('#type');
const price = document.querySelector('#price');

const syncValue = () => {
  let selectedType = type.options[type.selectedIndex].value.toUpperCase();

  if (selectedType === 'BUNGALOW') TypeMinPrices['BUNGALOW'] = TypeMinPrices['BUNGALOW'].toString();

  if (TypeMinPrices[selectedType]) {
    price.min = TypeMinPrices[selectedType];
    price.placeholder = TypeMinPrices[selectedType];
  }
};

syncValue();

type.addEventListener('change', syncValue);
