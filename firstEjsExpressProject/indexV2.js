"use strict";

const path = require("path");

const express = require("express");
const app = express();

// First we must say what's our template engine
app.set("view engine", "ejs");
// Telling where to find these views
app.set("views", path.join(__dirname, "pageTemplates"));

// Setting public folder to public
app.use(express.static(path.join(__dirname, "public")));

const { port, host } = require("./config.json");

const homePath = path.join(__dirname, "home.html");

const users = {
  matt: "secret",
  vera: "12345",
  jesse: "xyz",
};

app.get("/", (req, res) => res.sendFile(homePath));

// EJS templates come in handy here

// The action was "/login"
// Now this page sends something back
// Before the callback the second argument will be called,
// express.urlencoded needs to be there to decode the form (?)
// MIDDLEWARE it's called ?
app.post("/login", express.urlencoded({ extended: false }), (req, res) => {
  const { username, password } = req.body;
  // If user exists, render the results
  if (Object.keys(users).includes(username) && users[username] === password) {
    // render *.ejs file name, it will be recognised just by name
    res.render("result", {
      title: "Your data",
      header1: "You sent these:",
      // same as "username: username", JS6 does it automatically
      data: { username, password },
    });
  } else {
    res.render("errorPage", { username });
  }
});

app.get("/users", (req, res) =>
  res.render("users", {
    title: "users",
    header1: "Usernames:",
    // This will return the array of keys (so an array of names)
    usernames: Object.keys(users),
  })
);

app.get("/cars", (req, res) => {
  const cars = [
    {
      model: "Fast GT",
      licence: "ABC-1",
    },
    {
      model: "Errare",
      licence: "XYZ-123",
    },
    {
      model: "Fast GT",
      licence: "HI-1",
    },
    {
      model: "MBW",
      licence: "A-1",
    },
  ];
  res.render("tabledemo", { cars });
});

// This version checks if array is empty and gives a different result
app.get("/carsif", (req, res) => {
  const cars = [
    /*     {
      model: "Fast GT",
      licence: "ABC-1",
    },
    {
      model: "Errare",
      licence: "XYZ-123",
    },
    {
      model: "Fast GT",
      licence: "HI-1",
    },
    {
      model: "MBW",
      licence: "A-1",
    }, */
  ];
  res.render("tabledemoif", { cars });
});

app.listen(port, host, () =>
  console.log(`Server ${host}:${port} is listening...`)
);
