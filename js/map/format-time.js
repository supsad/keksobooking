import {TIME_CHECK_IN_OUT} from '../data.js';

const TIME_MESSAGE = 'Данные о въезде и выезде не удалось получить.';

// * words without declension
const TimeStringTemplates = {
  CHECK_IN: 'Заезд',
  CHECK_OUT: 'Выезд',
};

const isCheckInOutCorrect = (templates, value) => templates.some((element) => element === value);

const getTimeString = (timeValues, stringTemplates, checkoutSwitch = false) => {
  const [checkinValue, checkoutValue] = timeValues;
  const {CHECK_IN: checkinTemplate, CHECK_OUT: checkoutTemplate} = stringTemplates;

  let string = checkinTemplate;
  let timeValue = checkinValue;

  if (checkoutSwitch) {
    string = checkoutTemplate;
    timeValue = checkoutValue;
  }

  // ? test
  // timeValue = '15:00';

  if (isCheckInOutCorrect(TIME_CHECK_IN_OUT, timeValue)) {
    return `${string} после ${timeValue}`;
  }

  return `Неизвестное время ${string.toLowerCase()}а`;
};

// * template: 'Заезд после 12:00, выезд до 13:00'
const getFormatStringTime = (element, properties, unknownTemplate) => {
  const checkinString = getTimeString(properties, TimeStringTemplates);
  const checkoutString = getTimeString(properties, TimeStringTemplates, true);

  if (!checkinString.includes(unknownTemplate) || !checkoutString.includes(unknownTemplate)) {
    return `${checkinString}, ${checkoutString}`;
  } else if (checkoutString.includes(unknownTemplate)) {
    return `${checkinString}, ${checkoutString.toLowerCase()}`;
  }

  return TIME_MESSAGE; // * fallback if none of the conditions are met
};

export {getFormatStringTime};
