"use strict";

const http = require("http");

const { port, host } = require("./config.json");

const { getAllCars, getAllModels, getCar } = require("./carStorage");

const server = http.createServer((req, res) => {
  const { pathname, searchParams } = new URL(
    `http://${req.headers.host}${req.url}`
  );
  //   console.log(pathname);

  const route = decodeURIComponent(pathname);
  let result = [];

  if (route === "/cars") {
    result = getAllCars();
  } else if (route === "/cartypes") {
    result = getAllModels();
  } else if (route === "/search/bylicence") {
    result = getCar("licence", searchParams.get("value"));
  } else if (route === "/search/bymodel") {
    result = getCar("model", searchParams.get("value"));
  } else {
    result = { message: "not found" };
  }

  //   console.log("route", route);
  //   if (pathname === "/äåö") {
  //     console.log("adad");
  //   } else if (pathname === "/%C3%A4%C3%A5%C3%B6") {
  //     console.log("something");
  //   }
  res.writeHead(200, {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify(result, null, 2)); //2 here means number of empty spaces in fron of each result lines
});

server.listen(port, host, () => console.log(`${host}:${port} running...`));
