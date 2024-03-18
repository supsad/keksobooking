import {getArrayElementsToLowerCase, getIndexNumeralDeclination} from '/js/util.js';

const MAX_ROOMS = 100;
const CAPACITY_MESSAGE = 'Данные количества комнат и гостей не удалось получить.';
const TIME_MESSAGE = 'Данные о въезде и выезде не удалось получить.';
const TIMES_TEMPLATE = [
  '0:00',
  '1:00',
  '2:00',
  '3:00',
  '4:00',
  '5:00',
  '6:00',
  '7:00',
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];

// * words without declension
const TimeStringTemplates = {
  CHECK_IN: 'Заезд',
  CHECK_OUT: 'Выезд',
};


// * [value % 10 === 1, 1 < value%10 < 5, 10 < value < 20]
const CapacityStringTemplates = {
  ROOMS: ['Комната', 'Комнаты', 'Комнат'],
  GUESTS: ['Гостя', 'Гостей', 'Гостей'],
  NO_GUESTS: 'Не для гостей',
};

//! ============================================== CAPACITY ============================================================

let isMoreThan100Rooms = false;
const isRoomsOverloaded = (numberOfRooms) => numberOfRooms >= MAX_ROOMS;

const getCapacityText = (numberOfCapacity, stringsTemplate) => {
  const declensionIndex = getIndexNumeralDeclination(numberOfCapacity);
  return `${numberOfCapacity} ${stringsTemplate[declensionIndex]}`;
};

const getRoomsString = (numberOfRooms, stringTemplates) => {
  isMoreThan100Rooms = isRoomsOverloaded(numberOfRooms);

  const roomStrings = getArrayElementsToLowerCase(stringTemplates.ROOMS);

  return numberOfRooms > 0
    ? getCapacityText(numberOfRooms, roomStrings)
    : `Неизвестное число ${roomStrings[2].toLowerCase()}`;
};

const getGuestsString = (numberOfGuests, stringTemplates) => {
  const guestStrings = getArrayElementsToLowerCase(stringTemplates.GUESTS);

  if (isMoreThan100Rooms) {
    return `Не для ${guestStrings[2].toLowerCase()}`;
  }

  return numberOfGuests > 0
    ? getCapacityText(numberOfGuests, guestStrings)
    : `Неизвестного числа ${guestStrings[2].toLowerCase()}`;
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

//! ================================================ TIME ==============================================================

const isCheckInOutValuesCorrect = (template, value) => template.some((element) => element === value);

const getTimeString = (timeValues, stringsTemplate, checkoutSwitch = false) => {
  const [checkinValue, checkoutValue] = timeValues;
  const {CHECK_IN: checkinTemplate, CHECK_OUT: checkoutTemplate} = stringsTemplate;

  let string = checkinTemplate;
  let timeValue = checkinValue;

  if (checkoutSwitch) {
    string = checkoutTemplate;
    timeValue = checkoutValue;
  }

  return isCheckInOutValuesCorrect(TIMES_TEMPLATE, timeValue)
    ? `${string} после ${timeValue}`
    : `Неизвестное время ${string.toLowerCase()}а`;
};

// * template: 'Заезд после 12:00, выезд до 13:00'
const getFormatStringTime = (element, properties, unknownTemplate) => {
  const checkinString = getTimeString(properties, TimeStringTemplates);
  const checkoutString = getTimeString(properties, TimeStringTemplates, true);

  if (!checkinString.includes(unknownTemplate) || !checkoutString.includes(unknownTemplate)) {
    return `${checkinString}, ${checkoutString}`;
  } else if (checkoutString.includes(unknownTemplate)) {
    return `${checkinString}, ${checkoutString.toLowerCase()}`;
  }

  return TIME_MESSAGE; // * fallback if none of the conditions are met
};

export {getFormatStringCapacity, getFormatStringTime};
