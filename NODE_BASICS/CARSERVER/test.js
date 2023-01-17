"use strict";
const { getAllModels, getCar } = require("./carStorage");

console.log(getAllModels());
console.log(getCar("model", "Fast GT"));

// const typesArray = ["Fast GT", "Errare", "MbW"];
// console.log(`<li> ${typesArray.join("</li></li>")} </li>`);
