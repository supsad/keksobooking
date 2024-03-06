const ADVERTISEMENTS_URL = 'https://23.javascript.htmlacademy.pro/keksobooking/data';

const getDataAdvertisements = async (onSuccess, onFail) => {
  try {
    const response = await fetch(ADVERTISEMENTS_URL);

    if (response.ok) {
      const data = await response.json();
      await onSuccess(data);
    } else {
      throw new Error(`Загрузка данных не удалась!\n${response.status} ${response.statusText}`);
    }
  } catch (err) {
    await onFail(err);
  }
};

export {getDataAdvertisements};
export {renderErrorAlert} from './error.js';
