"use strict";

const path = require("path");
const express = require("express");

const app = express();

app.set("view engine", "ejs"); //Telling what view engines is used

app.set("views", path.join(__dirname, "PageTemplates")); //Telling where these views located

const { port, host } = require("./config.json");

const homePath = path.join(__dirname, "home.html");

app.get("/", (req, res) => res.sendFile(homePath)); //We define the root here

app.post("/login", express.urlencoded({ extended: false }), (req, res) => {
  //   console.log(req.body);

  //   Format of req.body. Uses name attributes from forma as fieldnames req.body ={usernem:'' password:''}

  //   res.render("result", {
  //     title: "Your data",
  //     header1: "You send here",
  //     data: req.body,
  //   }); //This will be rendering
  // });
  console.log(req.body);
  res.render("result", {
    title: "Your data",
    header1: "You send here",
    data: { username: req.body.username, password: req.body.password },
  }); //This will be rendering
});

app.listen(port, host, () =>
  console.log(`Server ${host}:${port} listening...`)
);
