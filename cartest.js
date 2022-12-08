"use strict";

const cars = require("./cars.json");

console.log(cars);
console.log(cars[0]);
console.log(cars[0].model);

console.log(cars[cars.length - 1]);

for (const car of cars) {
  console.log(car.model);
}

for (const car of cars) {
  if (car.model === "Fast GT") {
    console.log(car.licence);
  }
}
const models = [];

for (const car of cars) {
  if (!models.includes(car.model)) {
    models.push(car.model);
  }
}

console.log(`Available models: ${models.join(",")}`);
