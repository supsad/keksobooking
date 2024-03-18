import {getFormatStringCapacity, getFormatStringTime} from './format-popup.js';
import {clearElement} from '/js/util.js';

const PRICE_SYMBOL = '₽';
const PRICE_PER_NIGHT = `<span>${PRICE_SYMBOL}/ночь</span>`;

const OfferTypes = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOTEL: 'Отель',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
};

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

const WarningTemplates = {
  UNKNOWN: 'Неизвестно',
  FAILED: 'Не удалось',
  INFO_MESSAGE: 'Для получения дополнительной информации свяжитесь с владельцем.',
};

const cardTemplate = document.querySelector('#card').content;
if (!cardTemplate) {
  throw new Error('Card template is missing in the markup.');
}

const card = cardTemplate.querySelector('.popup');

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

const getWarningMessage = (capacityString, timeString) => {
  return capacityString.includes(WarningTemplates.UNKNOWN)
  || capacityString.includes(WarningTemplates.FAILED)
  || timeString.includes(WarningTemplates.UNKNOWN)
  || capacityString.includes(WarningTemplates.UNKNOWN)
    ? WarningTemplates.INFO_MESSAGE
    : null;
};

const getWarningElement = (element) => {
  element.textContent = getWarningMessage(capacityString, timeString);

  return element.textContent ?? element.textContent === '' ? element.remove() : element.textContent;
};

const setCardElement = (element, property, advertisementKey) => {
  clearElement(element);

  if (property) {
    if (property === 'warning') {
      getWarningElement(element);
      return;
    }

    switch (advertisementKey) {
      case 'avatar':
        element.src = property;
        return;

      case 'price':
        element.insertAdjacentHTML('beforeend', `${property} ${PRICE_PER_NIGHT}`);
        return;

      case 'type':
        element.textContent = addCardType(property);
        return;

      case 'capacity':
        element.textContent = getFormatStringCapacity(element, property, WarningTemplates.UNKNOWN);
        capacityString = element.textContent;
        return;

      case 'time':
        element.textContent = getFormatStringTime(element, property, WarningTemplates.UNKNOWN);
        timeString = element.textContent;
        return;

      case 'features':
        addCardFeatures(element, property);
        return;

      case 'photos':
        addCardPhotos(element, property);
        return;

      default:
        element.textContent = property;
        return;
    }
  }

  element.remove();
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

  setCardElement(element, [firstNumber, secondNumber], comparableObjectKey);
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

    setCardElement(element, property, key);
  });

  return newCard;
};

export {getNewCard};
