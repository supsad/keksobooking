import {fillArrayOfNodeList} from './util.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const disableInteractiveElements = (form) => {
  const interactiveFieldset = form.querySelectorAll('fieldset');
  const interactiveSelects = form.querySelectorAll('select');

  let interactiveElements = [];
  fillArrayOfNodeList(interactiveElements, interactiveFieldset);
  fillArrayOfNodeList(interactiveElements, interactiveSelects);

  for (let element of interactiveElements) {
    element.disabled = true;
  }
};

const renderInactive = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  disableInteractiveElements(adForm);
  disableInteractiveElements(mapFilters);
};

document.addEventListener('DOMContentLoaded', renderInactive);
