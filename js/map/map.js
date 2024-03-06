import {forms, Mode, renderUI} from '../render-page/index.js';

const COORDINATES_DECIMAL = 5;

const ErrorMessages = {
  TILE_ERROR: `Не удалось загрузить юридическое лицо, предоставляющее исходные данные карты!\n
               Отображение блока карты невозможно по лицензионному соглашению распространителя`,
  MAP_ERROR: 'Не удалось загрузить карту!',
  MAIN_PIN_ERROR: 'Не удалось загрузить главную метку для карты!',
  PIN_ERROR: 'Не удалось загрузить метки карты!',
}

const address = document.querySelector('#address');

const onMapLoad = ([lat, lng]) => {
  renderUI(Mode.ACTIVE, forms);

  address.readOnly = true;
  address.value = `${lat}, ${lng}`;
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
      .on('load', () => onMapLoad(Object.values(coordinates)))
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

// TODO нужен ли set?

const setMainPin = (pin, coordinates, Settings) => {
  pin.setLatLng(Object.values(coordinates));
  pin.setIcon(getPinIcon('/img/main-pin.svg', Settings));
  pin.setZIndexOffset(Settings.Z_INDEX_OFFSET);
  pin.options.draggable = true;
  pin.options.riseOnHover = true;
};

// TODO Переделать исключения для получения пина

const getPin = (coordinates, type, PinsSettings) => {
  try {
    const [lat, lng] = Object.values(coordinates);
    const {Main, Advertisement: Adv} = PinsSettings;
    const pin = L.marker(
      {
        lat: lat,
        lng: lng,
      },
      {
        icon: getPinIcon('/img/pin.svg', Adv),
      },
    );

    try {
      if (isMainPin(type, Main.TYPE)) {
        setMainPin(pin, coordinates, Main);
      }
    } catch (err) {
      throw new Error(`${ErrorMessages.MAIN_PIN_ERROR}\n${err.name} ${err.message}`);
    }

    return pin;
  } catch (err) {
    throw new Error(`${ErrorMessages.PIN_ERROR}\n${err.name} ${err.message}`);
  }
};

const onDraggablePin = (decimals = [COORDINATES_DECIMAL, COORDINATES_DECIMAL]) => {
  const [latDecimal, lngDecimal] = decimals;
  return (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    address.value = `${lat.toFixed(latDecimal)}, ${lng.toFixed(lngDecimal)}`;
  };
};

export {
  getMapTile,
  getMapCanvas,
  getPin,
  onDraggablePin
}
