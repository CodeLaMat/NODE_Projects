"use strict";

function adapt(customer) {
  console.log('adapter')
  return Object.assign(customer, {
    id: +customer.id,
    firstname: customer.firstname,
    lastname: customer.lastname,
    address: customer.address,
    class: customer.class,
  });
}

module.exports = { adapt };
