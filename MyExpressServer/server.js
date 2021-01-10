// jshint esversion:6

const express = require('express');
const app = express();
const port = 3000;

/*
app.get('/', (req, res) => {
  res.send('Hello World!');
});
*/

app.get("/", function(req, res) {
  // console.log(req);
  res.send("Hello World!");
});

app.get("/contact", function(req, res) {
  // console.log(req);
  res.send("Contact me at: seungwook.l95@gmail.com");
});

app.get("/about", function(req, res) {
  // console.log(req);
  res.send("Author: Seungwook Lee");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
