const ADVERTISEMENTS_URL = 'https://23.javascript.htmlacademy.pro/keksobooking/data';

const getDataAdvertisements = async (onSuccess, onFail) => {
  const response = await fetch(ADVERTISEMENTS_URL);

  try {
    if (response.ok) {
      const data = await response.json();
      await onSuccess(data);
    }
  } catch (err) {
    await onFail(err, response);
  }
};

export {getDataAdvertisements};
export {renderErrorMessage} from './error.js';
