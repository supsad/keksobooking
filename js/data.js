import {
  getOrderNumbersArray,
  getRandomArrayElement,
  getRandomInclusive,
  getRandomKey,
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
  'Окунитесь в мир неповторимой красоты: яркий солнечный свет играет на золотых вершинах гор, открывая взорам величественное пространство бескрайнего океана. Здесь, в уютном гнездышке у подножия гор, расположен наш прекрасный отель, который искусно сливается с окружающей природой, чтобы предложить вам незабываемые моменты покоя и вдохновения.',
  'Очаровательный ландшафт за окном отеля заставит ваше сердце замирать от восторга: узкие улочки, обрамленные историческими зданиями, ароматы кафе и шум веселых гуляющих посетителей. Наш отель расположен прямо в этом волшебном центре города, чтобы вы могли ощутить все его пульсирующие ритмы и погрузиться в сказочную атмосферу, исследуя его удивительные достопримечательности.',
  'Словно райский остров, наш отель возведен на песчаном берегу, омываемом бирюзовыми волнами. Спокойствие и расслабление охватят вас, когда вы погрузитесь в прозрачные глубины моря совместно с нашим профессиональным дайвинг-центром, а позже насладитесь лаской морского бриза и роскошными спа-процедурами, которые подарят вашему телу и душе истинное блаженство.',
  'На возвышенности, где ветер нежно проникает сквозь густые ветви вековых деревьев, расположился наш загадочный отель. Магия прошлого окутывает каждый его уголок, а величественный вид на мир города, простирающийся перед вами, заставит забыть о всем окружающем и вдохновиться на великие свершения.',
  'Забудьте о суете и окунитесь в мир безграничных возможностей, где торговые витрины и рестораны соблазнительно манят своей красотой и ароматами. Наш уникальный отель внезапно появляется на самом пульсе городской жизни, чтобы вы смогли в полной мере насладиться его непринужденной энергией и одновременно наслаждаться впечатлениями от разнообразия городских развлечений.',
  'Обнажая перед вами свою природную красоту, наш отель раскинулся в объятиях живописных лугов и искрящихся озер. Здесь каждое дыхание наполняется свежестью чистого воздуха, а все проблемы и тревоги растворяются в далеком горизонте. Путешествие становится истинным приключением, сочетающим активный отдых с наслаждением прекрасной природой.',
  'Погрузитесь в сказочную атмосферу и историю древних времен, воссозданные в уникальном замке, окруженном прекрасными садами и ухоженным парком. Орнаменты и резьба на стенах, роскошные люстры, которые переливаются разноцветными отблесками, и неизменная атмосфера величия пробудят в вашей душе чувство настоящего благородства и умиротворения.',
  'В модном и современном районе города, полном искрящихся витрин магазинов и захватывающего ритма ночной жизни, возник наш отель. Здесь вы сможете окунуться в обстановку стильной роскоши, наслаждаться шоппингом в бутиках известных дизайнеров и окружить себя множеством вечерних развлечений, которые заставят ваше сердце биться в унисон с городскими ритмами.',
  'В объятиях горной долины отель раскинулся перед вами с изумительным видом на заснеженные вершины и зеленые склоны. Здесь время течет медленно, позволяя вам наслаждаться каждым мгновением возможностей и спокойствия, которое приносит эта уникальная среда. Наши окрестности наполнены удивительными пейзажами, идеальными для пешеходных прогулок и наслаждения тишиной в объятиях природы.',
  'В районе бизнес-центра, куда спорят титаны бизнеса и инновации, наш отель возвышается как символ успеха и современности. В его просторных комнатах и дизайнерских интерьерах, увитых лучами света, вы найдете оазис спокойствия, наслаждаясь балансом между деловой энергией и комфортом высокого класса.',
]

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

const OfferTypes = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
};

const TypeMinPrices = {
  BUNGALOW: 0,
  FLAT: 1000,
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

const getAvatarMask = (array) => {
  let maskString = `img/avatars/user0${array[array.length - 1]}.png`;
  array.pop();

  return maskString;
};

const createAuthor = () => {
  const numberPhotos = shuffleArray(getOrderNumbersArray(SIMILAR_ADVERTISEMENTS_COUNT));

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

const createOffer = () => {
  return {
    title: getRandomArrayElement(TITLES_OFFER),
    address: 'location mask - "{{location.x}}, {{location.y}}"',
    price: getRandomInclusive(Price.MIN, Price.MAX, 'int'),
    type: getRandomKey(OfferTypes).toLowerCase(),
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

export {similarAdvertisementsNearby, OfferTypes, TypeMinPrices}
