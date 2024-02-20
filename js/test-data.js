import {
  getOrderNumbersArray,
  getRandomArrayElement,
  getRandomInclusive,
  getRandomObjectKey,
  getUniqueArray,
  shuffleArray
} from './util.js';

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

const TokyoCoordinates = {
  LATITUDE_X: 35.68950,
  LONGITUDE_Y: 139.69200,
};

const OfferTypes = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOTEL: 'Отель',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
};

const TypeMinPrices = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};

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
  MIN: 0,
  MAX: 1000000,
};

const NumberRooms = {
  MIN: 1,
  MAX: 6,
};

const NumberGuests = {
  MIN: 1,
  MAX: 5,
};

const numberPhotos = shuffleArray(getOrderNumbersArray(SIMILAR_ADVERTISEMENTS_COUNT));

const generateAvatar = () => {
  let maskString = `img/avatars/user0${numberPhotos[numberPhotos.length - 1]}.png`;
  numberPhotos.pop();

  return {
    avatar: maskString,
  };
};

const generateRandomLocation = () => {
  return {
    x: getRandomInclusive(LatitudeX.MIN, LatitudeX.MAX, 'float', LatitudeX.DECIMAL),
    y: getRandomInclusive(LongitudeY.MIN, LongitudeY.MAX, 'float', LongitudeY.DECIMAL),
  };
};

const generateRandomOffer = () => {
  return {
    title: getRandomArrayElement(TITLES_OFFER),
    price: getRandomInclusive(Price.MIN, Price.MAX),
    type: getRandomObjectKey(OfferTypes).toLowerCase(),
    rooms: getRandomInclusive(NumberRooms.MIN, NumberRooms.MAX),
    guests: getRandomInclusive(NumberGuests.MIN, NumberGuests.MAX),
    checkin: getRandomArrayElement(TIME_CHECK_IN_OUT),
    checkout: getRandomArrayElement(TIME_CHECK_IN_OUT),
    features: getUniqueArray(FEATURES_OFFER),
    description: getRandomArrayElement(DESCRIPTIONS_OFFER),
    photos: getUniqueArray(PHOTOS_OFFER),
  };
};

const getLocationMask = (location) => [location.x, location.y].join(', ');

const generateAdvertisement = () => {
  const author = generateAvatar();
  const location = generateRandomLocation();
  const offer = generateRandomOffer();

  offer.address = getLocationMask(location);

  return {
    author,
    offer,
    location,
  };
};

// * Create an advertisements generator function
// * This function accepts a count and returns an array of mock advertisements
const generateNearbyAdvertisements = (count) => {
  // ? Ensure count is a positive integer
  if (!Number.isInteger(count) || count <= 0) {
    throw new Error('Count must be a positive integer');
  }

  return Array.from({length: count}, generateAdvertisement);
};

const advertisements = generateNearbyAdvertisements(SIMILAR_ADVERTISEMENTS_COUNT);

export {advertisements, OfferTypes, TypeMinPrices, TokyoCoordinates, LongitudeY, LatitudeX, TIME_CHECK_IN_OUT};
