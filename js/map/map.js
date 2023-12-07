import {TokyoCoordinates} from '../data.js';
import {renderCards} from './popup-card.js';
import {forms, renderInactiveInterface, renderInteractiveElements} from '../interactive-page/index.js';

const mapCanvas = document.querySelector('#map-canvas');

const onMapLoad = () => {
  document.removeEventListener('DOMContentLoaded', renderInactiveInterface);
  renderInteractiveElements('active', forms);
};

const map = L.map('map-canvas')
  .on('load', onMapLoad)
  .setView({
    lat: TokyoCoordinates.LatitudeX,
    lng: TokyoCoordinates.LongitudeY,
  }, 10);

L.tileLayer(
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
  {
    foo: 'bar',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const addCardToMap = () => mapCanvas.appendChild(renderCards());

export {addCardToMap};
