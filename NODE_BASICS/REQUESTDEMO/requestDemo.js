"use strict";

const http = require("http");

const { port, host } = require("./config.json");

const server = http.createServer((req, res) => {
  //   console.log(req);
  //   console.log(req.url);
  //   console.log(req.headers);
  //
  const urlData = new URL(`http://${host}:${port}${req.url}`);
  //   console.log(urlData);
  res.writeHead(200, { "Content-Type": "application/json" });
  //   res.end(JSON.stringify(urlData));

  const { pathname } = urlData;
  console.log(pathname);
});

server.listen(port, host, () =>
  console.log(`Server ${host}: ${port} is running...`)
);
