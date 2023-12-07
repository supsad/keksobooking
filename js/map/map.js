import {TokyoCoordinates} from '../data.js';
import {renderCards} from './popup-card.js';
import {forms, renderInactiveInterface, renderInteractiveElements} from '../interactive-page/index.js';

const mapCanvas = document.querySelector('#map-canvas');

const address = document.querySelector('#address');

const onMapLoad = () => {
  document.removeEventListener('DOMContentLoaded', renderInactiveInterface);
  renderInteractiveElements('active', forms);

  address.readOnly = true;
  address.value = `${TokyoCoordinates.LatitudeX}, ${TokyoCoordinates.LongitudeY}`
};

const map = L.map('map-canvas')
  .on('load', onMapLoad)
  .setView({
    lat: TokyoCoordinates.LatitudeX,
    lng: TokyoCoordinates.LongitudeY,
  }, 10);

const mapTile = L.tileLayer(
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
  {
    foo: 'bar',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);

mapTile.addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: TokyoCoordinates.LatitudeX,
    lng: TokyoCoordinates.LongitudeY,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

const addCardToMap = () => mapCanvas.appendChild(renderCards());

export {addCardToMap};
