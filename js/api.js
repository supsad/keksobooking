const ADVERTISEMENTS_URL = 'https://23.javascript.htmlacademy.pro/keksobooking/data';
const SEND_DATA_URL = 'https://23.javascript.htmlacademy.pro/keksobooking';

const getDataAdvertisements = async (onSuccess, onFail) => {
  try {
    const response = await fetch(ADVERTISEMENTS_URL);

    if (!response.ok) {
      onFail(['Загрузка данных не удалась!', `${response.status}`, `${response.statusText}`]);
      return;
    }

    const data = await response.json();
    onSuccess(data);
  } catch (err) {
    onFail(err);
  }
};

const sendUserAnnouncementData = async (body, onSuccess, onFail) => {
  try {
    const response = await fetch(
      SEND_DATA_URL,
      {
        method: 'POST',
        body,
      },
    );

    return !response.ok
      ? onFail(['Отправка данных не удалась!', `${response.status}`, `${response.statusText}`])
      : onSuccess();
  } catch (err) {
    onFail(err);
  }
};

export {getDataAdvertisements, sendUserAnnouncementData};
