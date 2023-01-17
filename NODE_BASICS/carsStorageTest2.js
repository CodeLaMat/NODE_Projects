"use strict";

const { getAllCars, getAllModels, getCar } = require("./carStorage");

console.log(storage, getAllCars());
console.log(storage.getAllModels());
console.log(`\nAll available models: \n\t${getAllModels().join("\n\t")}`);

console.log(storage.getCar());
console.log(storage.getCar());
console.log(storage.getCar());
console.log(storage.getCar());
console.log(storage.getCar());
