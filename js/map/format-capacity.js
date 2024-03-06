import {getArrayElementsToLowerCase, getIndexNumeralDeclination} from '/js/util.js';

const MAX_ROOMS = 100;
const CAPACITY_MESSAGE = 'Данные количества комнат и гостей не удалось получить.';

// * words without declension
// * [value % 10 === 1, 1 < value%10 < 5, 10 < value < 20]
const CapacityStringTemplates = {
  ROOMS: ['Комната', 'Комнаты', 'Комнат'],
  GUESTS: ['Гостя', 'Гостей', 'Гостей'],
  NO_GUESTS: 'Не для гостей',
};

let isMoreThan100Rooms = false;
const isRoomsOverloaded = (numberOfRooms) => numberOfRooms >= MAX_ROOMS;

const getCapacityText = (numberOfCapacity, stringsTemplate) => {
  const declensionIndex = getIndexNumeralDeclination(numberOfCapacity);
  return `${numberOfCapacity} ${stringsTemplate[declensionIndex]}`;
};

const getRoomsString = (numberOfRooms, stringTemplates) => {
  isMoreThan100Rooms = isRoomsOverloaded(numberOfRooms);

  const roomStrings = getArrayElementsToLowerCase(stringTemplates.ROOMS);

  if (numberOfRooms > 0) {
    return getCapacityText(numberOfRooms, roomStrings);
  }

  return `Неизвестное число ${roomStrings[2].toLowerCase()}`;
};

const getGuestsString = (numberOfGuests, stringTemplates) => {
  const guestStrings = getArrayElementsToLowerCase(stringTemplates.GUESTS);

  if (isMoreThan100Rooms) {
    return `Не для ${guestStrings[2].toLowerCase()}`;
  }

  if (numberOfGuests > 0) {
    return getCapacityText(numberOfGuests, guestStrings);
  }

  return `Неизвестного числа ${guestStrings[2].toLowerCase()}`;
};

// * template: '2 комнаты для 3 гостей'
const getFormatStringCapacity = (element, properties, unknownTemplate) => {
  // * Declension strings
  const [roomsProperty, guestsProperty] = properties;

  const roomString = getRoomsString(roomsProperty, CapacityStringTemplates);
  const guestString = getGuestsString(guestsProperty, CapacityStringTemplates);

  if (!roomString.includes(unknownTemplate) || !guestString.includes(unknownTemplate)) {
    return `${roomString} для ${guestString}`;
  } else if (guestString.includes(unknownTemplate)) {
    return `${roomString} для ${guestString.toLowerCase()}`;
  }

  return CAPACITY_MESSAGE; // * fallback if none of the conditions are met
};

export {getFormatStringCapacity};
