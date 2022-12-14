"use strict";

const { CODES, MESSAGES } = require("./statusCodes");

const {
  getAllFromStorage,
  getFromStorage,
  addToStorage,
  updateStorage,
  removeFromStorage,
} = require("./storageLayer");

//Datastorage class

module.exports = class Datastorage {
  get CODES() {
    return CODES;
  }

  getAll() {
    return getAllFromStorage();
  } //end getAll

  getOne(id) {
    return new Promise(async (resolve, reject) => {
      if (!id) {
        reject(MESSAGES.NOT_FOUND("---No id number---"));
      } else {
        const result = await getFromStorage(id);
        if (result) {
          resolve(result);
        } else {
          reject(MESSAGES.NOT_FOUND(id));
        }
      }
    });
  } //end of getOne

  insert(customer) {
    return new Promise(async (resolve, reject) => {
      if (customer) {
        if (!customer.id) {
          reject(MESSAGES.NOT_INSERTED());
        } else if (await getFromStorage(customer.id)) {
          reject(MESSAGES.ALREADY_IN_USE(customer.id));
        } else if (await addToStorage(customer)) {
          resolve(MESSAGES.INSERT_OK(customer.id));
        } else {
          reject(MESSAGES.NOT_INSERTED());
        }
      } else {
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  } //end of insert

  update(customer) {
    return new Promise(async (resolve, reject) => {
      if (customer) {
        if (await updateStorage(customer)) {
          resolve(MESSAGES.UPDATE_OK(customer.id));
        } else {
          reject(MESSAGES.NOT_UPDATED());
        }
      } else {
        reject(MESSAGES.NOT_UPDATED());
      }
    });
  } //end update

  remove(id) {
    return new Promise(async (resolve, reject) => {
      if (!id) {
        reject(MESSAGES.NOT_FOUND("---No id number---"));
      } else if (await removeFromStorage(id)) {
        resolve(MESSAGES.REMOVE_OK(id));
      } else {
        reject(MESSAGES.NOT_REMOVED(id));
      }
    });
  } //end of remove
};
