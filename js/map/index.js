import {
  getAdvertisementPins,
  getAdvertisements,
  getMainPin,
  getMapCanvas,
  getMapTile,
  onDraggableMainPin
} from './map.js';

const renderMap = () => {
  const mapTile = getMapTile();
  const map = getMapCanvas(mapTile);

  const mainPinMarker = getMainPin();
  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend', onDraggableMainPin);

  getAdvertisements(map, getAdvertisementPins);
};

export {renderMap};
