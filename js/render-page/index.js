import {renderInteractiveElements} from './render-page.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const forms = [adForm, mapFilters]

const renderInactiveInterface = () => {
  renderInteractiveElements('inactive', forms);
};

document.addEventListener('DOMContentLoaded', renderInactiveInterface);

export {forms, renderInactiveInterface, renderInteractiveElements};
