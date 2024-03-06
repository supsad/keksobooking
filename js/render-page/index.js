import {Mode, renderInteractiveElements} from './render-page.js';

const advertisementForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const Forms = {
  form: advertisementForm,
  filters: mapFilters,
};

const renderUI = (mode, forms) => {
  forms = Object.values(forms);

  if (mode === Mode.ACTIVE) {
    renderInteractiveElements(mode, forms);
    return;
  }

  renderInteractiveElements(mode, forms);
};

export {Forms, renderUI};
export {Mode, renderInteractiveElements} from './render-page.js';
export {renderErrorAlert} from './error.js';
