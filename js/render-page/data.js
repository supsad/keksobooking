import {getDataAdvertisements} from '/js/api/index.js';
import {renderErrorAlert} from '/js/render-page/index.js'
import {getRandomArrayInterval} from '/js/util.js';

const SIMILAR_ADVERTISEMENTS_COUNT = 10;
const ERROR_MESSAGE = 'Произошла ошибка! Загрузка данных для карты прервалась!\n' +
  'Попробуйте перезагрузить страницу!';

const renderData = async (map, renderAdvertisements) => {
  await getDataAdvertisements((advertisements) => {
    renderAdvertisements(
      map,
      getRandomArrayInterval(advertisements, SIMILAR_ADVERTISEMENTS_COUNT),
    );
  }, (err) => {
    console.error(err);
    renderErrorAlert(ERROR_MESSAGE);
  });
};

export {renderData};
