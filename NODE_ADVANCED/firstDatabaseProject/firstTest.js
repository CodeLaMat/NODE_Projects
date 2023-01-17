"use strict";

const mariadb = require("mariadb");

//run a testA function

testA();

//helper function
async function testA() {
  const options = {
    host: "127.0.0.1", //the host of Db
    port: 3306, //the port of Db
    user: "zeke",
    password: "1234",
    database: "employeeDb",
    allowPublicKeyRetrieval: true, //in case if we get *RSA public key is not available client side* error
  };

  const connection = await mariadb.createConnection(options);

  let result = await connection.query("select * from employee");

  delete result.meta; //removing meta from result
  // close connection

  console.log(Object.values(result[0]));
  console.log(result.map((item) => Object.values(item)));

  console.log("######## test 2 ########");
  result = await connection.query({
    rowsAsArray: true,
    sql: "select * from employee",
  });

  delete result.meta;
  console.log(result);

  console.log("###### test 3 #######");
  result = await connection.query("select * from employee where id=?", [1]);
  delete result.meta;
  console.log(result);

  connection.end();
}
