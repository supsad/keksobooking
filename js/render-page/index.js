import {Mode, renderInteractiveElements} from './render-page.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const forms = [adForm, mapFilters];

const renderInactiveInterface = ({inactive, active}) => {
  if (active === Mode.ACTIVE) {
    renderInteractiveElements(active, forms);
    return;
  }

  renderInteractiveElements(inactive, forms);
};

export {forms, Mode, renderInteractiveElements, renderInactiveInterface};
