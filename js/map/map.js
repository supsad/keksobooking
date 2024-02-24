import {getNewCard} from './popup-card.js';
import {forms, Mode, renderUI} from '../render-page/index.js';

const TokyoCoordinates = {
  LATITUDE_X: 35.68950,
  LONGITUDE_Y: 139.69200,
};

const LatitudeX = {
  MIN: 35.65000,
  MAX: 35.70000,
  DECIMAL: 5,
};

const LongitudeY = {
  MIN: 139.70000,
  MAX: 139.80000,
  DECIMAL: 5,
};

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

// TODO Сделать колбеки? Перенести переменные в отдельные функции?

const address = document.querySelector('#address');

const onMapLoad = () => {
  renderUI(Mode.ACTIVE, forms);

  address.readOnly = true;
  address.value = `${TokyoCoordinates.LATITUDE_X}, ${TokyoCoordinates.LONGITUDE_Y}`;
};

const getMapTile = () => {
  return L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
    {
      foo: 'bar',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  );
};

const getMapCanvas = (tile) => {
  const map = L.map('map-canvas')
    .on('load', onMapLoad)
    .setView({
      lat: TokyoCoordinates.LATITUDE_X,
      lng: TokyoCoordinates.LONGITUDE_Y,
    }, MapSettings.ZOOM);

  tile.addTo(map);

  return map;
};

const getMainPin = () => {
  const mainPinIcon = L.icon({
    iconUrl: '/img/main-pin.svg',
    iconSize: [MainPin.WIDTH, MainPin.HEIGHT],
    iconAnchor: [(MainPin.WIDTH / 2), MainPin.HEIGHT],
  });

  return L.marker(
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
};

const onDraggableMainPin = (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  address.value = `${lat.toFixed(LatitudeX.DECIMAL)}, ${lng.toFixed(LongitudeY.DECIMAL)}`;
};

const getAdvertisementPins = ({lat: x, lng: y}) => {
  const pinIcon = L.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [AdvertisementPin.WIDTH, AdvertisementPin.HEIGHT],
    iconAnchor: [(AdvertisementPin.WIDTH / 2), AdvertisementPin.HEIGHT],
  });

  return L.marker(
    {
      lat: x,
      lng: y,
    },
    {
      icon: pinIcon,
    },
  );
};

// TODO Карточки брать из DocumentFragment, чтобы отрисовать их разом

const getAdvertisements = (advertisements, map, getPin) => {
  advertisements.forEach((advertisement) => {
    const pinMarker = getPin(advertisement.location);

    pinMarker
      .addTo(map)
      .bindPopup(
        getNewCard(advertisement),
        {
          keepInView: true,
        },
      );
  });
};

export {
  getMapTile,
  getMapCanvas,
  getMainPin,
  getAdvertisementPins,
  getAdvertisements,
  onDraggableMainPin
}
