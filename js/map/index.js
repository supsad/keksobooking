import {getMapCanvas, getMapTile, getPin, onDraggablePin} from './map.js';
import {getNewCard} from './popup-card.js';
import {Forms, Mode, renderErrorAlert, renderUI} from '/js/render-page/index.js';

const Coordinates = {
  Tokyo: {
    LATITUDE: 35.68950,
    LONGITUDE: 139.69200,
  },
  MapArea: [
    {
      MIN: 35.65000,
      MAX: 35.70000,
      DECIMAL: 5,
    },
    {
      MIN: 139.70000,
      MAX: 139.80000,
      DECIMAL: 5,
    },
  ],
};

const MapSettings = {
  ZOOM: 12,
};

const PinsSettings = {
  Main: {
    WIDTH: 52,
    HEIGHT: 52,
    Z_INDEX_OFFSET: 2000,
    TYPE: 'Main',
  },
  Advertisement: {
    WIDTH: 40,
    HEIGHT: 40,
    TYPE: 'Advertisement',
  },
};

const ErrorMessages = {
  MAP_ERROR: 'Страница полностью неактивная и заблокирована из-за ошибки загрузки карты!',
  MAIN_PIN_ERROR: 'Форма объявления отключена из-за ошибки загрузки главной метки!',
  ADV_PIN_ERROR: 'Форма фильтров карты отключена из-за ошибки загрузки меток объявлений на карте!',
};

const AlertMessages = {
  ALERT: 'Упс! Что-то пошло не так!',
  MAP: 'Страница неактивна и полностью заблокирована!',
  MAIN_PIN: 'Форма для заполнения объявления неактивна, но вы можете выбрать отель для заселения.',
  ADV_PIN: 'Форма фильтров карты отключена и невозможно выбрать отель, ' +
    'но вы можете заполнить собственное объявления для продажи',
  TIP: 'Для решения проблемы, Вы можете попробовать перезагрузить страницу!',
};

const renderMainPin = (map) => {
  try {
    const mainPinMarker = getPin(Coordinates.Tokyo, PinsSettings.Main.TYPE, PinsSettings);
    mainPinMarker.addTo(map);

    const [Lat, Lng] = Coordinates.MapArea;
    mainPinMarker.on('moveend', onDraggablePin([Lat.DECIMAL, Lng.DECIMAL]));
  } catch (err) {
    const [advForm] = Object.values(Forms);
    renderUI(Mode.INACTIVE, [advForm]);
    renderErrorAlert(`${AlertMessages.ALERT} ${AlertMessages.MAIN_PIN} ${AlertMessages.TIP}`);
    throw new Error(`${ErrorMessages.MAIN_PIN_ERROR}\n${err.name} ${err.message}`);
  }
};

const renderAdvertisements = (map, data) => {
  try {
    data.forEach((advertisement) => {
      const pinMarker = getPin(advertisement.location, PinsSettings.Advertisement.TYPE, PinsSettings);

      pinMarker
        .bindPopup(
          getNewCard(advertisement),
          {
            keepInView: true,
          },
        ).addTo(map);
    });
  } catch (err) {
    const [, mapFilters] = Object.values(Forms);
    renderUI(Mode.INACTIVE, [mapFilters]);
    renderErrorAlert(`${AlertMessages.ALERT} ${AlertMessages.ADV_PIN} ${AlertMessages.TIP}`);
    throw new Error(`${ErrorMessages.ADV_PIN_ERROR}\n${err.name} ${err.message}`);
  }
};

const renderMap = () => {
  let map;

  try {
    map = getMapCanvas(Coordinates.Tokyo, MapSettings.ZOOM);
    const mapTile = getMapTile();
    mapTile.addTo(map);
  } catch (err) {
    renderUI(Mode.INACTIVE, Forms);
    renderErrorAlert(`${AlertMessages.ALERT} ${AlertMessages.MAP} ${AlertMessages.TIP}`);
    throw new Error(`${ErrorMessages.MAP_ERROR}\n${err.name} ${err.message}`);
  }

  return map;
};

export {renderMap, renderMainPin, renderAdvertisements};
