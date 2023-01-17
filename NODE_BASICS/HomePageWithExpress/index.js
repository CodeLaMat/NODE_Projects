"use strict";

const path = require("path");

const express = require("express");

const app = express();

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

const homePath = path.join(__dirname, "home.html");
const pageBpath = path.join(__dirname, "PageB.html");

app.use(express.static(path.join(__dirname, "public"))); //Do get all styles, images and pages to work, we need to give access to public folder

app.get("/", (req, res) => res.sendFile(homePath)); //We define the root here
app.get("/pageb", (req, res) => res.sendFile(pageBpath));

app.listen(port, host, () =>
  console.log(`Server ${host}:${port} listening...`)
);
