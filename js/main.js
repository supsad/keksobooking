'use strict'

// TODO Decomposing to 'switch'
const getRandomIntInclusive = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomIntInclusive(0, 100);

const getRandomFloatInclusive = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  return Number((Math.random() * (max - min + 1) + min).toFixed(1));
}


getRandomFloatInclusive(0, 100);

// TODO Homework Chapter 3
// ! Creating an array of 10 generated JS objects
/*
? Structure function output:
author (obj) = {
  avatar (string): "img/avatars/user{{xx}}.png", // Unique {{xx}} randomInt(1, 10) with leading zero, like "01".
};

offer (obj) = {
  title (string): "string", // offer title. Come up with it yourself.
  address (string): "{{location.x}}, {{location.y}}", // offer address
  price (int): n, // random positive integer
  type (string): "one of four", // fixed values - palace, flat, house, bungalow
  rooms (int): n, // random positive integer
  guests (int): n, // random positive integer
  checkin (string): "one of three", // fixed values - 12:00, 13:00, 14:00
  checkout (string): "one of three", // fixed values - 12:00, 13:00, 14:00
  features (array string): [], // unique arr random length - [wifi, dishwasher, parking, washer, elevator, conditioner]
  description (string): "string", // description of the premises. Come up with it yourself.
  photos (array string): [],
  // arr random length
  [
  http://o0.github.io/assets/images/tokyo/hotel1.jpg,
  http://o0.github.io/assets/images/tokyo/hotel2.jpg,
  http://o0.github.io/assets/images/tokyo/hotel3.jpg
  ]
};

location (obj) = {
  x (float): n.m(5), // random float from 35.65000 to 35.70000
  y (float): n.m(5), // random float from 139.70000 to 139.80000
};
*/
