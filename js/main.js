import {renderAdvertisements, renderMainPin, renderMap} from './map/index.js';
import {resetFormButton, resetPage, setUserFormSubmit} from './form/index.js';
import {page, renderData, renderSuccessModal} from './render-page/index.js';

const init = () => {
  const map = renderMap();
  const mainPin = renderMainPin(map);
  void renderData(map, renderAdvertisements);


  setUserFormSubmit(() => {
    resetPage(mainPin)
    renderSuccessModal(page);
  });
  resetFormButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetPage(mainPin);
  });
};

document.addEventListener('DOMContentLoaded', init);
