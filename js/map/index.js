import {getMapCanvas, getMapTile, getPin, onDraggablePin} from './map.js';
import {forms, Mode, renderUI} from '../render-page/index.js';
import {getNewCard} from './popup-card.js';

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

const renderAdvertisements = (data, map) => {
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
    console.error(err);
  }
};

const renderMap = (data) => {
  try {
    const map = getMapCanvas(Coordinates.Tokyo, MapSettings.ZOOM);
    const mapTile = getMapTile();
    mapTile.addTo(map);

    const mainPinMarker = getPin(Coordinates.Tokyo, PinsSettings.Main.TYPE, PinsSettings);
    mainPinMarker.addTo(map);

    const [Lat,Lng] = Coordinates.MapArea;
    mainPinMarker.on('moveend', onDraggablePin([Lat.DECIMAL, Lng.DECIMAL]));

    renderAdvertisements(data, map);
  } catch (err) {
    console.error(err);
    renderUI(Mode.INACTIVE, forms);
  }
};

export {renderMap};
