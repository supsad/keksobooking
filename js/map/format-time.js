import {TIME_CHECK_IN_OUT} from '../test-data.js';

const TIME_MESSAGE = 'Данные о въезде и выезде не удалось получить.';

// * words without declension
const TimeStringTemplates = {
  CHECK_IN: 'Заезд',
  CHECK_OUT: 'Выезд',
};

const isCheckInOutValuesCorrect = (template, value) => template.some((element) => element === value);

const getTimeString = (timeValues, stringsTemplate, checkoutSwitch = false) => {
  const [checkinValue, checkoutValue] = timeValues;
  const {CHECK_IN: checkinTemplate, CHECK_OUT: checkoutTemplate} = stringsTemplate;

  let string = checkinTemplate;
  let timeValue = checkinValue;

  if (checkoutSwitch) {
    string = checkoutTemplate;
    timeValue = checkoutValue;
  }

  if (isCheckInOutValuesCorrect(TIME_CHECK_IN_OUT, timeValue)) {
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
