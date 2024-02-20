import {OfferTypes} from '../test-data.js';
import {clearElement} from '../util.js';
import {getFormatStringCapacity} from './format-capacity.js';
import {getFormatStringTime} from './format-time.js';
import {getWarningMessage, WarningTemplates} from './warning-message.js';

const PRICE_SYMBOL = '₽';
const PRICE_PER_NIGHT = `<span>${PRICE_SYMBOL}/ночь</span>`;

const PhotoOptions = {
  WIDTH: 45,
  HEIGHT: 40,
  ALT: 'Фотография жилья.',
};

// ! I think this is bad practice, since the class can change at any time during development.
// ! In the future, I need to change my approach

const selectors = {
  avatar: '.popup__avatar',
  title: '.popup__title',
  address: '.popup__text--address',
  price: '.popup__text--price',
  type: '.popup__type',
  capacity: {
    properties: ['rooms', 'guests'],
    elementClass: '.popup__text--capacity',
  },
  time: {
    properties: ['checkin', 'checkout'],
    elementClass: '.popup__text--time',
  },
  warning: '.popup__text--warning',
  features: '.popup__features',
  description: '.popup__description',
  photos: '.popup__photos',
};

const cardTemplate = document.querySelector('#card').content;
if (!cardTemplate) {
  throw new Error('Card template is missing in the markup.');
}

const card = cardTemplate.querySelector('.popup');
if (!card) {
  throw new Error('Popup card is missing in the markup');
}

const addCardFeatures = (list, features) => {
  return features.forEach((value) => {
    const listItem = document.createElement('li');
    listItem.className = `popup__feature popup__feature--${value}`;
    list.appendChild(listItem);
  });
};

const addCardType = (type) => OfferTypes[type.toUpperCase()];

const addCardPhotos = (container, photos) => {
  return photos.forEach((photoURL) => {
    const photo = document.createElement('img');
    photo.className = 'popup__photo';
    photo.src = photoURL;
    photo.width = PhotoOptions.WIDTH;
    photo.height = PhotoOptions.HEIGHT;
    photo.alt = PhotoOptions.ALT;

    container.appendChild(photo);
  });
};

let capacityString, timeString;

const getWarningElement = (element) => {
  element.textContent = getWarningMessage(capacityString, timeString);

  if (element.textContent === undefined || element.textContent === null || element.textContent === '') {
    return element.remove();
  }

  return element.textContent;
};

const getCardElement = (element, property, advertisementKey) => {
  clearElement(element);

  switch (advertisementKey) {
    case 'avatar':
      element.src = property;
      break;

    case 'price':
      element.insertAdjacentHTML('beforeend', `${property} ${PRICE_PER_NIGHT}`);
      break;

    case 'type':
      element.textContent = addCardType(property);
      break;

    case 'capacity':
      element.textContent = getFormatStringCapacity(element, property, WarningTemplates.UNKNOWN);
      capacityString = element.textContent;
      break;

    case 'time':
      element.textContent = getFormatStringTime(element, property, WarningTemplates.UNKNOWN);
      timeString = element.textContent;
      break;

    case 'features':
      addCardFeatures(element, property);
      break;

    case 'photos':
      addCardPhotos(element, property);
      break;

    default:
      element.textContent = property;
      break;
  }

  if (property === 'warning') {
    getWarningElement(element);
  }

  if (!property) {
    return element.remove();
  }

  return null;
};

const getUserSelects = (parentObject, comparableObjectKey, cardTemplate) => {
  let {elementClass} = selectors.capacity;
  let {rooms: firstNumber, guests: secondNumber} = parentObject;

  if (comparableObjectKey === 'time') {
    elementClass = selectors.time.elementClass;
    firstNumber = parentObject.checkin;
    secondNumber = parentObject.checkout;
  }

  const element = cardTemplate.querySelector(elementClass);

  return getCardElement(element, [firstNumber, secondNumber], comparableObjectKey);
};

const getNewCard = ({author, offer}) => {
  const newCard = card.cloneNode(true);
  newCard.id = 'card';
  Object.entries(selectors).forEach(([key, value]) => {
    if (typeof value === 'object') {
      return getUserSelects(offer, key, newCard);
    }

    let property = author[key] || offer[key];

    if (key === 'warning') {
      property = 'warning';
    }

    const element = newCard.querySelector(value);

    getCardElement(element, property, key);
  });

  return newCard;
};

export {getNewCard};
