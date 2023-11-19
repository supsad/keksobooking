const getRandomInclusive = (min, max, numberType = 'int', decimals = 1) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  switch (numberType) {
    case 'int':
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random() * (max - min + 1)) + min;

    case 'float':
    case 'double':
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

const getRandomArrayElement = (array) => array[getRandomInclusive(0, array.length - 1, 'int')];

const getRandomKey = (obj) => getRandomArrayElement(Object.keys(obj));

const getUniqueArray = (values) => {
  const uniqueArray = shuffleArray([...values]);
  const randomLength = getRandomInclusive(1, values.length - 1, 'int');

  while (uniqueArray.length > randomLength) {
    uniqueArray.pop();
  }

  return uniqueArray;
};

const clearList = (list) => {
  for (let i = list.children.length - 1; i >= 0; i--) {
    const child = list.children[i];

    child.parentElement.removeChild(child);
  }
};

const syncOptionsHandler = (initList, changeList) => changeList.selectedIndex = initList.selectedIndex;

export {
  getRandomInclusive,
  shuffleArray,
  getOrderNumbersArray,
  getRandomArrayElement,
  getRandomKey,
  getUniqueArray,
  clearList,
  syncOptionsHandler
}
