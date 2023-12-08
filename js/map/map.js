import {advertisements, TokyoCoordinates} from '../data.js';
import {getNewCard} from './popup-card.js';
import {forms, renderInactiveInterface, renderInteractiveElements} from '../interactive-page/index.js';

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
  }, 12);

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
})

advertisements.forEach((advertisement) => {
  const {x,  y} = advertisement.location;

  const pinIcon = L.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const pinMarker = L.marker(
    {
      lat: x,
      lng: y,
    },
    {
      icon: pinIcon,
    },
  );

  pinMarker
    .addTo(map)
    .bindPopup(
      getNewCard(advertisement),
      {
        keepInView: true,
      },
    );
});
