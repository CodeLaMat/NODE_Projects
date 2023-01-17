"use strict";

function adapt(customer) {
  console.log('adapter')
  return Object.assign(customer, {
    customerId: +customer.customerId,
    firstname: customer.firstname,
    lastname: customer.lastname,
    address: customer.address,
    customerclass: customer.customerclass,
  });
}

module.exports = { adapt };
