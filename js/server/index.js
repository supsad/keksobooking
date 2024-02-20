import {getData} from './data.js';

const URL = 'https://23.javascript.htmlacademy.pro/keksobooking/data';

try {
  getData(URL);
} catch (err) {
  console.log(err);
}
