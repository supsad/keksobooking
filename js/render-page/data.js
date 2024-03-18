import {getDataAdvertisements} from '/js/api.js';
import {page, renderErrorAlert} from '/js/render-page/index.js'
import {getRandomArrayInterval} from '/js/util.js';

const SIMILAR_ADVERTISEMENTS_COUNT = 10;
const CONSOLE_ERROR_MESSAGE = 'Загрузка данных для карты прервалась!';
const ERROR_MESSAGE = [
  'Произошла ошибка!',
  'Загрузка данных для карты прервалась! Вы все еще можете отправить нам ваше объявление!',
  'Для решения проблемы, попробуйте перезагрузить страницу!',
];

const renderData = async (map, renderAdvertisements) => {
  await getDataAdvertisements((advertisements) => {
    renderAdvertisements(
      map,
      getRandomArrayInterval(advertisements, SIMILAR_ADVERTISEMENTS_COUNT),
    );
  }, (err) => {
    renderErrorAlert(page, ERROR_MESSAGE);
    throw new Error(`${CONSOLE_ERROR_MESSAGE}\n${err.name} ${err.message}`);
  });
};

export {renderData};
