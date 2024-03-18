import {address, housePriceInput, houseTypeSelect, onValidCapacity} from './index.js';
import {fillTargetChangeableListsMap, sortCollection} from '/js/util.js';

const TypeMinPrices = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};

const Price = {
  MIN: 0,
  MAX: 1000000,
  REQUIRED: true,
};

const setAddressInput = ([lat, lng]) => {
  address.readOnly = true;
  address.value = `${lat}, ${lng}`;
};

const setPriceInputAttr = () => {
  housePriceInput.min  ??= Price.MIN;
  housePriceInput.max ??= Price.MAX;
  housePriceInput.required ??= Price.REQUIRED;
};

const houseSyncPrice = () => {
  const bungalowKey = Object.keys(TypeMinPrices).find((key) => key === 'BUNGALOW');

  let selectedType = houseTypeSelect.options[houseTypeSelect.selectedIndex].value.toUpperCase();

  // * 0 is not displayed, so it is converted to text
  if (selectedType === bungalowKey) {
    TypeMinPrices[bungalowKey] = TypeMinPrices[bungalowKey].toString();
  }

  if (TypeMinPrices[selectedType]) {
    let priceValue = TypeMinPrices[selectedType];
    housePriceInput.min = priceValue;
    housePriceInput.placeholder = priceValue;
  }
};

const syncRoomsCapacityHandler = (roomNumber, capacity) => {
  const roomsValue = roomNumber.value;
  const capacityOptions = capacity.options;

  // * The array is static, but every time the input changes, it is updated, so it can be used
  // * The index becomes equal to the 'value' in DOM
  const sortedCapacityOptions = sortCollection([].slice.call(capacityOptions));

  const roomCapacityMap = fillTargetChangeableListsMap(roomNumber);

  sortedCapacityOptions.forEach((option) => {
    option.disabled = !roomCapacityMap[roomsValue].includes(option.value);
  });

  onValidCapacity(capacity, roomsValue, roomCapacityMap);
};

export {setPriceInputAttr, setAddressInput, houseSyncPrice, syncRoomsCapacityHandler};
