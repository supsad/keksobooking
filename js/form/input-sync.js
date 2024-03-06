import {sortCollection} from '/js/util.js';

const fillTargetChangeableListsMap = (targetList) => {
  const targetOptions = targetList.options;
  const map = {};

  [...targetOptions].forEach((option) => {
    const optionValue = option.value;

    if (optionValue === '100') {
      return map[optionValue] = ['0'];
    }

    map[optionValue] = Array.from({length: optionValue}, (_, i) => String(i + 1));
  });

  return map;
};

const isCapacityOptionInvalid = (capacity, roomValue, map) => {
  let isDisabled = true;

  for (let option of capacity.selectedOptions) {
    return isDisabled = !!option.disabled;
  }

  return isDisabled && !map[roomValue].includes(capacity.value);
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

  if (isCapacityOptionInvalid(capacity, roomsValue, roomCapacityMap)) {
    capacity.setCustomValidity('Выбрана недоступная опция.');
  } else {
    capacity.setCustomValidity('');
  }

  capacity.reportValidity();
};

export {syncRoomsCapacityHandler};
