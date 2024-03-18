import {Forms, setAddressInput} from './index.js';
import {setSyncForm} from '/js/render-page/index.js';
import {Coordinates} from '/js/map/index.js';

const resetPage = (mainPin) => {
  Forms.form.reset();
  Forms.filters.reset();
  setSyncForm();

  const coordinates = Object.values(Coordinates.Tokyo);
  mainPin.setLatLng(coordinates);
  setAddressInput(coordinates);
};

export {resetPage};
