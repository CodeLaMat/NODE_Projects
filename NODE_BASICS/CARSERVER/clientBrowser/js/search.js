"use strict";

(function () {
  let resultSet;
  let licenceInput;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    resultSet = document.getElementById("resultSet");
    licenceInput = document.getElementById("licence");

    document.getElementById("send").addEventListener("click", send);
  }

  async function send() {
    try {
      const licence = licenceInput.value;
      resultSet.innerHTML = "";

      const data = await fetch(
        `http://localhost:3000/search/bylicence?value=${licence}`,
        { mode: "cors" }
      );
      const cars = await data.json();

      for (const car of cars) {
        const tr = document.createElement("tr");
        tr.appendChild(createCell(car.model));
        tr.appendChild(createCell(car.licence));
        resultSet.appendChild(tr);
      }
    } catch (err) {}
  }

  function createCell(text) {
    const td = document.createElement("td");
    td.textContent = text;
    return td;
  }
})();
