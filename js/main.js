'use strict';

const TITLE_OFFER = ['Hotel', 'Hostel', 'Apartment', 'Houseroom', 'Motel', 'B&B-hotel', 'Apart-hotel',
  'Capsule hotel', 'Guest-house', 'Bed and Breakfast'];
const FEATURES_OFFER = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TYPE_HOUSING_OFFER = ['palace', 'flat', 'house', 'bungalow'];
const SIMILAR_ADVERTISEMENTS_COUNT = 10;

const getRandomInclusive = (min, max, numberType = 'int', decimals = 5) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  switch (numberType) {
    case 'int':
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random() * (max - min + 1)) + min;

    // * .toFixed() at the end because in .parseFloat() it didn't produce fixed length decimals
    case 'float':
    case 'double':
      return parseFloat((Math.random() * (max - min) + min)).toFixed(decimals);

    default:
      return -1;
  }
};

const shuffleArray = (array) => {
  let currentIndex = array.length;

  while (0 !== currentIndex) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    let temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
}

// ! Возможно, сделать через new Array ? (унифицированную функцию)
const createNumbersArray = (length) => {
  let arr = [];

  for (let i = 1; i <= length; i++) {
    arr.push(i);
  }

  console.log(arr);
  return arr;
}

// TODO из-за того, что вызов функции каждый раз новый, простой цикл не подойдет. Придется либо глобальную переменную
// использовать, либо пересоздавать массив, удаляю из него полученный значения

createNumbersArray(10);
let arr = shuffleArray(createNumbersArray(10));
console.log(arr);

// TODO Homework Chapter 3
// ! Creating an array of 10 generated JS objects
/*
? Structure function output:
author (obj) = {
  avatar (string): "img/avatars/user{{xx}}.png", // Unique {{xx}} randomInt(1, 10) with leading zero, like "01".
};

offer (obj) = {
  title (string): "string", // offer title. Come up with it yourself.
  address (string): "{{location.x}}, {{location.y}}", // offer address
  price (int): n, // random positive integer
  type (string): "one of four", // fixed values - palace, flat, house, bungalow
  rooms (int): n, // random positive integer
  guests (int): n, // random positive integer
  checkin (string): "one of three", // fixed values - 12:00, 13:00, 14:00
  checkout (string): "one of three", // fixed values - 12:00, 13:00, 14:00
  features (array string): [], // unique arr random length - [wifi, dishwasher, parking, washer, elevator, conditioner]
  description (string): "string", // description of the premises. Come up with it yourself.
  photos (array string): [],
  // arr random length
  [
  http://o0.github.io/assets/images/tokyo/hotel1.jpg,
  http://o0.github.io/assets/images/tokyo/hotel2.jpg,
  http://o0.github.io/assets/images/tokyo/hotel3.jpg
  ]
};

location (obj) = {
  x (float): n.m(5), // random float from 35.65000 to 35.70000
  y (float): n.m(5), // random float from 139.70000 to 139.80000
};
*/

const createAuthorAvatar = () => {
  const author = {
    // TODO uniq number (create array with exit indexes)
    avatar: `img/avatars/user0${getRandomInclusive(0, 10, 'int')}.png`,
  };

  return {
    author,
  };
};

// ! Адреса и локации разнятся, нужно куда-то сохранять значения
// TODO use destructuring to 'x' and 'y' arguments
const createLocation = () => {
  const location = {
    x: getRandomInclusive(35.65000, 35.70000, 'float', 5),
    y: getRandomInclusive(139.70000, 139.80000, 'float', 5),
  };

  return {
    location,
  };
};

const getLocationMask = (obj) => {
  return Object.entries(obj.location)
    .map(([key, value]) => `${key}.${value}`)
    .join(', ');
};

const createOffer = () => {
  const offer = {
    title: 'hotel', // TODO data.js - [hotel, hostel, сделать массив с названиями отелей]
    address: getLocationMask(createLocation()), // TODO чтобы значения сохранялись в объекте
    price: getRandomInclusive(10_000, 1_000_000, 'int'),
    type: 'one of four', // TODO data.js - fixed values - [palace, flat, house, bungalow],
    rooms: getRandomInclusive(1, 6, 'int'),
    guests: getRandomInclusive(1, 10, 'int'),
    checkin: `${getRandomInclusive(12, 14, 'int')}:00`,
    checkout: `${getRandomInclusive(12, 14, 'int')}:00`,
    features: ['string'], // TODO unique arr random length - [wifi, dishwasher, parking, washer, elevator, conditioner]
    description: '?for pidors!',
    photos: ['string'],
  };

  return {
    offer,
  };
};

const createFullOfferNearby = () => Object.assign({}, createAuthorAvatar(), createLocation(), createOffer());

const similarAdvertisementsNearby = new Array(SIMILAR_ADVERTISEMENTS_COUNT)
  .fill(null)
  .map(() => createFullOfferNearby());

console.log(similarAdvertisementsNearby);
