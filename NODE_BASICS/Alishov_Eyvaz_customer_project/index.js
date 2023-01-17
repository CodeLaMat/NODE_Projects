"use strict";

const path = require("path");

const express = require("express");
const app = express();

const { port, host, storage } = require("./serverConfig.json");

const Datastorage = require(path.join(
  __dirname,
  storage.storageFolder,
  storage.dataLayer
));

const dataStorage = new Datastorage();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const menuPath = path.join(__dirname, "menu.html");

app.get("/", (req, res) => res.sendFile(menuPath));

app.get("/all", (req, res) =>
  dataStorage
    .getAll()
    .then((data) => res.render("allCustomers", { result: data }))
);

app.get("/getCustomer", (req, res) =>
  res.render("getCustomer", {
    title: "Find customer",
    header: "Find a customer",
    action: "/getCustomer",
  })
);

app.post("/getCustomer", (req, res) => {
  if (!req.body) return res.sendStatus(500);

  const customerId = req.body.id;
  dataStorage
    .getOne(customerId)
    .then((customer) => res.render("customerPage", { result: customer }))
    .catch((error) => sendErrorPage(res, error));
});

app.get("/inputform", (req, res) =>
  res.render("form", {
    title: "Add customer",
    header: "Add a new customer",
    action: "/input",
    customerId: { value: "", readonly: "" },
    firstname: { value: "", readonly: "" },
    lastname: { value: "", readonly: "" },
    address: { value: "", readonly: "" },
    customerclass: { value: "", readonly: "" },
  })
);

app.post("/input", (req, res) => {
  if (!req.body) return res.statusCode(500);

  dataStorage
    .insert(req.body)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendErrorPage(res, error));
});

app.get("/updateform", (req, res) =>
  res.render("form", {
    title: "Update customer",
    header: "Update customer data",
    action: "/updatedata",
    customerId: { value: "", readonly: "" },
    firstname: { value: "", readonly: "readonly" },
    lastname: { value: "", readonly: "readonly" },
    address: { value: "", readonly: "readonly" },
    customerclass: { value: "", readonly: "readonly" },
  })
);

app.post("/updatedata", (req, res) => {
  if (!req.body) return res.sendStatus(500);

  dataStorage
    .getOne(req.body.customerId)
    .then((customer) =>
      res.render("form", {
        title: "Update customer",
        header: "Update customer data",
        action: "/update",
        customerId: { value: customer.customerId, readonly: "readonly" },
        firstname: { value: customer.firstname, readonly: "" },
        lastname: { value: customer.lastname, readonly: "" },
        address: { value: customer.address, readonly: "" },
        customerclass: { value: customer.customerclass, readonly: "" },
      })
    )
    .catch((error) => sendErrorPage(res, error));
});

app.post("/update", (req, res) => {
  if (!req.body) return res.statusCode(500);

  dataStorage
    .update(req.body)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendErrorPage(res, error));
});

app.get("/removeCustomer", (req, res) =>
  res.render("getCustomer", {
    title: "Remove customer",
    header: "Remove a customer from database",
    action: "/removeCustomer",
  })
);

app.post("/removeCustomer", (req, res) => {
  if (!req.body) return res.sendStatus(500);

  const customerId = req.body.id;
  dataStorage
    .remove(customerId)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendErrorPage(res, error));
});

app.listen(port, host, () =>
  console.log(`Server ${host}:${port} listening...`)
);

//helper functions
function sendErrorPage(res, error, title = "Error", header = "Error") {
  sendStatusPage(res, error, title, header);
}

function sendStatusPage(res, status, title = "Status", header = "Status") {
  return res.render("statusPage", { title, header, status });
}
