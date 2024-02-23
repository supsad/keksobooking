import {
  getAdvertisementPins,
  getAdvertisements,
  getMainPin,
  getMapCanvas,
  getMapTile,
  onDraggableMainPin
} from './map.js';

const renderMap = (data) => {
  const mapTile = getMapTile();
  const map = getMapCanvas(mapTile);

  const mainPinMarker = getMainPin();
  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend', onDraggableMainPin);

  getAdvertisements(data, map, getAdvertisementPins);
};

export {renderMap};
