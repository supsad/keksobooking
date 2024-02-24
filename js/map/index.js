import {
  getAdvertisementPins,
  getAdvertisements,
  getMainPin,
  getMapCanvas,
  getMapTile,
  onDraggableMainPin
} from './map.js';
import {forms, Mode, renderUI} from '../render-page/index.js';

const renderMap = (data) => {
  try {
    const mapTile = getMapTile();
    const map = getMapCanvas(mapTile);

    const mainPinMarker = getMainPin();
    mainPinMarker.addTo(map);
    mainPinMarker.on('moveend', onDraggableMainPin);

    getAdvertisements(data, map, getAdvertisementPins);
  } catch (err) {
    renderUI(Mode.INACTIVE, forms);
    console.log(err);
    throw new Error('Не удалось загрузить карту!');
  }
};

export {renderMap};
