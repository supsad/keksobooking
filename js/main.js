'use strict';

const SIMILAR_ADVERTISEMENTS_COUNT = 10;

const TITLES_OFFER = [
  'Hotel',
  'Hostel',
  'Apartment',
  'Houseroom',
  'Motel',
  'B&B-hotel',
  'Apart-hotel',
  'Capsule hotel',
  'Guest-house',
  'Bed and Breakfast',
];

const DESCRIPTIONS_OFFER = [
  'A luxurious five-star hotel with a sea view, the perfect place for a romantic getaway.',
  'A modern boutique hotel in the city center with a unique design and high-level service.',
  'A cozy family hotel with a pool and a playground, perfect for family vacations.',
  'An exclusive spa resort offering a wide range of treatments and services for relaxation and rejuvenation.',
  'A hotel with a traditional atmosphere and superb cuisine, offering guests a real taste of local culture.',
  'An economical option with comfortable rooms and a convenient location close to major attractions.',
  'A hotel for active leisure enthusiasts with access to water sports and mountain skiing.',
  'An eco-hotel surrounded by nature, providing an opportunity to experience an environmentally friendly lifestyle.',
  'A historic hotel in a heritage building with original decor and antique furniture.',
  'A specialized hotel for business travelers with modern conference rooms and business services.',
];

const FEATURES_OFFER = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const TYPES_HOUSING_OFFER = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const PHOTOS_OFFER = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const TIME_CHECK_IN_OUT = [
  '12:00',
  '13:00',
  '14:00',
];

const LatitudeX = {
  MIN: 35.65000,
  MAX: 35.70000,
  DECIMAL: 5,
};

const LongitudeY = {
  MIN: 139.70000,
  MAX: 139.80000,
  DECIMAL: 5,
};

const Price = {
  MIN: 10000,
  MAX: 300000,
};

const NumberRooms = {
  MIN: 1,
  MAX: 6,
};

const NumberGuests = {
  MIN: 1,
  MAX: 5,
};

const getRandomInclusive = (min, max, numberType = 'int', decimals = LatitudeX.DECIMAL) => {
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

    case 'float':
    case 'double':
      return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

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
};

const getOrderNumbersArray = (length) => {
  let arr = [];

  for (let i = 0; i < length; i++) {
    arr.push(i + 1);
  }

  return arr;
};

const getRandomArrayElement = (array) => array[getRandomInclusive(0, array.length - 1, 'int')];

const numberPhotos = shuffleArray(getOrderNumbersArray(SIMILAR_ADVERTISEMENTS_COUNT));

const getAvatarMask = (array) => {
  let maskString = `img/avatars/user0${array[array.length - 1]}.png`;
  array.pop();

  return maskString;
};

const createAuthor = () => {
  return {
    avatar: getAvatarMask(numberPhotos),
  };
};

const createLocation = () => {
  return {
    x: getRandomInclusive(LatitudeX.MIN, LatitudeX.MAX, 'float', LatitudeX.DECIMAL),
    y: getRandomInclusive(LongitudeY.MIN, LongitudeY.MAX, 'float', LongitudeY.DECIMAL),
  };
};

const getUniqueArray = (values) => {
  const uniqueArray = shuffleArray(values.slice());
  const randomLength = getRandomInclusive(1, values.length - 1, 'int');

  while (uniqueArray.length > randomLength) {
    uniqueArray.pop();
  }

  return uniqueArray;
};

const createOffer = () => {
  return {
    title: getRandomArrayElement(TITLES_OFFER),
    address: 'location mask - "{{location.x}}, {{location.y}}"',
    price: getRandomInclusive(Price.MIN, Price.MAX, 'int'),
    type: getRandomArrayElement(TYPES_HOUSING_OFFER),
    rooms: getRandomInclusive(NumberRooms.MIN, NumberRooms.MAX, 'int'),
    guests: getRandomInclusive(NumberGuests.MIN, NumberGuests.MAX, 'int'),
    checkin: getRandomArrayElement(TIME_CHECK_IN_OUT),
    checkout: getRandomArrayElement(TIME_CHECK_IN_OUT),
    features: getUniqueArray(FEATURES_OFFER),
    description: getRandomArrayElement(DESCRIPTIONS_OFFER),
    photos: getUniqueArray(PHOTOS_OFFER),
  };
};

const getLocationMask = (location) => [location.x, location.y].join(', ');

const createFullOfferNearby = () => {
  const author = createAuthor();
  const location = createLocation();
  const offer = createOffer();

  offer.address = getLocationMask(location);

  return {
    author,
    offer,
    location,
  };
};


const similarAdvertisementsNearby =
  new Array(SIMILAR_ADVERTISEMENTS_COUNT)
    .fill(null)
    .map(() => createFullOfferNearby());

console.log(similarAdvertisementsNearby);
