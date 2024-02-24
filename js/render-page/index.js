import {Mode, renderInteractiveElements} from './render-page.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const forms = [adForm, mapFilters];

const renderUI = (mode) => {
  if (mode === Mode.ACTIVE) {
    renderInteractiveElements(mode, forms);
    return;
  }

  renderInteractiveElements(mode, forms);
};

export {forms, renderUI}
export {Mode, renderInteractiveElements} from './render-page.js';
