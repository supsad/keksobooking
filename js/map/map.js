import {address, Forms, setAddressInput} from '/js/form/index.js'
import {Mode, renderUI} from '/js/render-page/index.js';

const COORDINATES_DECIMAL = 5;

const ErrorMessages = {
  TILE_ERROR: 'Не удалось загрузить юридическое лицо, предоставляющее исходные данные карты!\n' +
    'Отображение блока карты невозможно по лицензионному соглашению распространителя',
  MAP_ERROR: 'Не удалось загрузить карту!',
  MAIN_PIN_ERROR: 'Не удалось загрузить главную метку для карты!',
  PIN_ERROR: 'Не удалось загрузить метки карты!',
}

const onMapLoad = (coordinates) => {
  renderUI(Mode.ACTIVE, Object.values(Forms));

  setAddressInput(coordinates);
};

const getMapTile = () => {
  try {
    return L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
      {
        foo: 'bar',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    );
  } catch (err) {
    throw new Error(`${ErrorMessages.TILE_ERROR}\n${err.name} ${err.message}`);
  }
};

const getMapCanvas = (coordinates, zoom) => {
  try {
    const [lat, lng] = Object.values(coordinates);

    return L.map('map-canvas')
      .on('load', () => onMapLoad([lat, lng]))
      .setView({
        lat: lat,
        lng: lng,
      }, zoom);
  } catch (err) {
    throw new Error(`${ErrorMessages.MAP_ERROR}\n${err.name} ${err.message}`);
  }
};

const getPinIcon = (path = '/img/pin.svg', {WIDTH, HEIGHT}) => {
  return L.icon({
    iconUrl: path,
    iconSize: [WIDTH, HEIGHT],
    iconAnchor: [(WIDTH / 2), HEIGHT],
  });
};

const isMainPin = (type, verifiableType) => type.toLowerCase() === verifiableType.toLowerCase();

const getPinMarker = (coordinates, icon) => {
  const [lat, lng] = Object.values(coordinates);

  return L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      icon: icon,
    },
  );
};

const setMainPin = (pin, Settings) => {
  pin.setZIndexOffset(Settings.Z_INDEX_OFFSET);
  pin.options.draggable = true;
  pin.options.riseOnHover = true;
};

const getPin = (coordinates, type, PinsSettings) => {
  const {Main, Advertisement: Adv} = PinsSettings;
  let pin;

  if (isMainPin(type, Main.TYPE)) {
    try {
      pin = getPinMarker(Object.values(coordinates), getPinIcon('/img/main-pin.svg', Main));
      setMainPin(pin, coordinates, Main);
      return pin;
    } catch (err) {
      throw new Error(`${ErrorMessages.MAIN_PIN_ERROR}\n${err.name} ${err.message}`);
    }
  }

  try {
    pin = getPinMarker(Object.values(coordinates), getPinIcon('/img/pin.svg', Adv));
  } catch (err) {
    throw new Error(`${ErrorMessages.PIN_ERROR}\n${err.name} ${err.message}`);
  }

  return pin;
};

const onDraggablePin = (decimals = [COORDINATES_DECIMAL, COORDINATES_DECIMAL]) => {
  const [latDecimal, lngDecimal] = decimals;
  return (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    address.value = `${lat.toFixed(latDecimal)}, ${lng.toFixed(lngDecimal)}`;
  };
};

export {getMapTile, getMapCanvas, getPin, onDraggablePin}
