import {advertisements, OfferTypes} from '../data.js';
import {clearList} from '../util.js';

const cardTemplate = document.querySelector('#card').content;
// add error check in case there is no element with id 'card'
if (!cardTemplate) {
  throw new Error('Card template is missing in the markup.');
}

const card = cardTemplate.querySelector('.popup');
// add error check in case there is no element with class 'popup'
if (!card) {
  throw new Error('Popup card is missing in the markup');
}

const addCardFeatures = (list, features) => {
  clearList(list);

  return features.forEach((value) => {
    const listItem = document.createElement('li');
    listItem.className = `popup__feature popup__feature--${value}`;
    list.appendChild(listItem);
  });
};

const addCardType = (type) => OfferTypes[type.toUpperCase()];

const addCardPhotos = (container, photos) => {
  clearList(container);

  photos.forEach((photoURL) => {
    const photo = document.createElement('img');
    photo.className = 'popup__photo';
    photo.src = photoURL;
    photo.width = 45;
    photo.height = 40;
    photo.alt = 'Фотография жилья';

    container.appendChild(photo);
  });

  return container;
};

const getNewCard = ({author, offer}) => {
  const newCard = card.cloneNode(true);

  const cardAvatar = newCard.querySelector('.popup__avatar');
  cardAvatar.src = author.avatar;

  const cardTitle = newCard.querySelector('.popup__title');
  cardTitle.textContent = offer.title;

  const cardAddress = newCard.querySelector('.popup__text--address');
  cardAddress.textContent = offer.address;

  const cardPrice = newCard.querySelector('.popup__text--price');
  cardPrice.textContent = `${offer.price} `;
  const priceSymbolElement = '<span>₽/ночь</span>';
  cardPrice.insertAdjacentHTML('beforeend', priceSymbolElement);

  const cardType = newCard.querySelector('.popup__type');
  cardType.textContent = addCardType(offer.type);

  const cardRooms = newCard.querySelector('.popup__text--capacity');
  cardRooms.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;

  const cardCheckInOut = newCard.querySelector('.popup__text--time');
  cardCheckInOut.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const cardFeaturesList = newCard.querySelector('.popup__features');
  addCardFeatures(cardFeaturesList, offer.features);

  const cardDescription = newCard.querySelector('.popup__description');
  cardDescription.textContent = offer.description;

  const cardPhotoList = newCard.querySelector('.popup__photos');
  addCardPhotos(cardPhotoList, offer.photos);

  return newCard;
};

const renderCards = () => {
  const cardFragment = document.createDocumentFragment();

  // Error check in case advertisements is not an array or is an empty array
  if (!Array.isArray(advertisements) || !advertisements.length) {
    throw new Error('No advertisements data');
  } else {
    // Add render for each advertisement card
    advertisements.forEach(advertisement => cardFragment.appendChild(getNewCard(advertisement)));
  }

  return cardFragment;
};

export {renderCards};
