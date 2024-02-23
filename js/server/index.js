const ADVERTISEMENTS_URL = 'https://23.javascript.htmlacademy.pro/keksobooking/data';

const getDataAdvertisements = async (onSuccess) => {
  const response = await fetch(ADVERTISEMENTS_URL);

  try {
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      await onSuccess(data);
    }
  } catch (err) {
    console.log(err);
    throw new Error(`${response.status} ${response.statusText}`);
  }
};

export {getDataAdvertisements};
