"use strict";

const Database = require("./database");

const printMessage = (message) => console.log(message);
const printStatement = (statement) => printMessage(`${statement};`);
const printError = (message) =>
  printMessage(
    `${"#".repeat(20)} Error ${"#".repeat(20)}\n` +
      `${message}\n${"#".repeat(47)}`
  );

let createStatementFile = "./createStatements.json";
let adminPass = "";

// Then we check arguments

if (process.argv.length > 2) {
  adminPass = process.argv[2];
  if (process.argv.length > 3) {
    createStatementFile = `./${process.argv[3]}`;
  }
}

// console.log(createStatementFile, adminPass);

try {
  createDB(require(createStatementFile));
} catch (error) {
  printError(error.message);
}

async function createDB(createStatements, adminPass) {
  const options = {
    host: createStatements.host,
    port: createStatements.port,
    user: createStatements.admin,
    password: adminPass,
  };

  const DEBUG = createStatements.debug;
  const db = new Database(options);

  //   "jane"@"localhost"

  const user = `"${createStatements.user}"@"${createStatements.host}"`;
  const dropDatabaseSql = `drop database if exists ${createStatements.database}`;
  const createDatabaseSql = `create database ${createStatements.database}`;

  const dropUserSql = `drop user if exists ${user}`;
  constCreateUserSql =
    `create user if not exits ${user} ` +
    `ìdentified by "${createStatements.userpassword}"`;
  const grantPrivilegesSql = `grant all privileges on ${createStatements.database}.*to ${user}`;

  try {
    await db.doQuery(dropDatabaseSql);
    if (DEBUG) printStatement(dropDatabaseSql);
    await db.doQuery(createDatabaseSql);
    if (DEBUG) printStatement(createDatabaseSql);
    if (createStatements.dropUser) {
      await db.doQuery(dropUserSql);
      if (DEBUG) printStatement(dropUserSql);
    }

    await db.doQuery(createUserSql);
    if (DEBUG) printStatement(createUserSql);
    await db.doQuery(grantPrivilegesSql);
    if (DEBUG) printStatement(grantPrivilegesSql);


    for (let table of createStatements.tables){
if (table.columns && table.columns.length>0){
const createDatabaseSql = `create table ${createStatements.database}.${table.tableName}()`
    }
    else {
        if (DEBUG) printMessage("Table columns missing. Table was not created");
    }


  } catch {
    printError(error);
  }
}
