import {advertisements, LatitudeX, LongitudeY, TokyoCoordinates} from '../test-data.js';
import {getNewCard} from './popup-card.js';
import {forms, renderInactiveInterface, renderInteractiveElements} from '../render-page/index.js';

const MapSettings = {
  ZOOM: 12,
};

const MainPin = {
  WIDTH: 52,
  HEIGHT: 52,
  Z_INDEX_OFFSET: 1000,
};

const AdvertisementPin = {
  WIDTH: 40,
  HEIGHT: 40,
};

const address = document.querySelector('#address');

const onMapLoad = () => {
  document.removeEventListener('DOMContentLoaded', renderInactiveInterface);
  renderInteractiveElements('active', forms);

  address.readOnly = true;
  address.value = `${TokyoCoordinates.LATITUDE_X}, ${TokyoCoordinates.LONGITUDE_Y}`;
};

const map = L.map('map-canvas')
  .on('load', onMapLoad)
  .setView({
    lat: TokyoCoordinates.LATITUDE_X,
    lng: TokyoCoordinates.LONGITUDE_Y,
  }, MapSettings.ZOOM);

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
  iconSize: [MainPin.WIDTH, MainPin.HEIGHT],
  iconAnchor: [(MainPin.WIDTH / 2), MainPin.HEIGHT],
});

const mainPinMarker = L.marker(
  {
    lat: TokyoCoordinates.LATITUDE_X,
    lng: TokyoCoordinates.LONGITUDE_Y,
  },
  {
    draggable: true,
    icon: mainPinIcon,
    zIndexOffset: MainPin.Z_INDEX_OFFSET,
    riseOnHover: true,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  address.value = `${lat.toFixed(LatitudeX.DECIMAL)}, ${lng.toFixed(LongitudeY.DECIMAL)}`;
});

advertisements.forEach((advertisement) => {
  const {x,  y} = advertisement.location;

  const pinIcon = L.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [AdvertisementPin.WIDTH, AdvertisementPin.HEIGHT],
    iconAnchor: [(AdvertisementPin.WIDTH / 2), AdvertisementPin.HEIGHT],
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
