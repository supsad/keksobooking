import {renderCards} from './popup-card.js';

const mapCanvas = document.querySelector('#map-canvas');

const addCardToMap = () => {
  mapCanvas.appendChild(renderCards());
};

export {addCardToMap}
