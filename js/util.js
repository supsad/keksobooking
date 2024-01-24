const NumberTypes = {
  INTEGER: 'integer',
  FLOAT: 'float',
  DOUBLE: 'double',
};

const getRandomInclusive = (min, max, numberType = NumberTypes.INTEGER, decimals = 1) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  switch (numberType) {
    case NumberTypes.INTEGER:
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random() * (max - min + 1)) + min;

    case NumberTypes.FLOAT:
    case NumberTypes.DOUBLE:
      return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

    default:
      return -1;
  }
};

const shuffleArray = (array) => {
  let currentIndex = array.length;

  while (0 !== currentIndex) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    let temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
};

const getOrderNumbersArray = (length) => {
  let arr = [];

  for (let i = 0; i < length; i++) {
    arr.push(i + 1);
  }

  return arr;
};

const getRandomArrayElement = (array) => array[getRandomInclusive(0, array.length - 1)];

const getRandomKey = (obj) => getRandomArrayElement(Object.keys(obj));

const getUniqueArray = (values) => {
  const uniqueArray = shuffleArray([...values]);
  const randomLength = getRandomInclusive(1, values.length - 1);

  while (uniqueArray.length > randomLength) {
    uniqueArray.pop();
  }

  return uniqueArray.slice(0, randomLength);
};

const clearElement = (element) => element.innerHTML = '';

const syncOptionsHandler = (initList, changeList) => changeList.selectedIndex = initList.selectedIndex;

const disabledAttrHandler = (state, elements) => elements.forEach(element => element.disabled = state);

const getIndexNumeralDeclination = (value) => {
  value = Math.abs(value) % 100;
  const tempValue = value % 10;
  const indices = [0, 1, 2];

  if (value > 10 && value < 20) {
    return indices[2];
  } else if (tempValue > 1 && tempValue < 5) {
    return indices[1];
  } else if (tempValue === 1) {
    return indices[0];
  }

  return indices[2];
};

const getArrayLowerCase = (strings) => strings.map((element) => element.toLowerCase());

export {
  getRandomInclusive,
  shuffleArray,
  getOrderNumbersArray,
  getRandomArrayElement,
  getRandomKey,
  getUniqueArray,
  clearElement,
  syncOptionsHandler,
  disabledAttrHandler,
  getIndexNumeralDeclination,
  getArrayLowerCase
};
