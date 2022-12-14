"use strict";

const path = require("path");

const { key, adapterFile, storageFile } = require("./storageConfig.json");

const { readStorage, writeStorage } = require("./readerWriter");

const storageFilePath = path.join(__dirname, storageFile);

const { adapt } = require(path.join(__dirname, adapterFile));

console.log(storageFilePath)

async function getAllFromStorage() {
  return readStorage(storageFilePath);
}

async function getFromStorage(customerId) {
  return (
    (await readStorage(storageFilePath)).find(
      (customer) => customer[key] == customerId
    ) || null
  );
}

async function addToStorage(newObject) {
  const storageData = await readStorage(storageFilePath);
  storageData.push(adapt(newObject));
  return await writeStorage(storageFilePath, storageData);
}

async function updateStorage(modifiedObject) {
  const storageData = await readStorage(storageFilePath);
  const oldObject = storageData.find(
    (customer) => customer[key] == modifiedObject[key]
  );
  if (oldObject) {
    Object.assign(oldObject, adapt(modifiedObject));
    return await writeStorage(storageFilePath, storageData);
  }
  return false;
}

async function removeFromStorage(customerId) {
  const storageData = await readStorage(storageFilePath);
  const i = storageData.findIndex((customer) => customer[key] == customerId);
  if (i < 0) return false;
  storageData.splice(i, 1);
  return await writeStorage(storageFilePath, storageData);
}

module.exports = {
  getAllFromStorage,
  getFromStorage,
  addToStorage,
  updateStorage,
  removeFromStorage,
};
