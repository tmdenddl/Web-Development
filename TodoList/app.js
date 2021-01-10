const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Tell the app to use EJS as view engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;

let items = [];

app.get("/", function(req, res) {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);

  // Render a file in list directory with ejs extension
  // Give 'kindOfDay' variable a value same as that of the 'day'
  res.render("list", {kindOfDay: day, newListItems: items});
});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  items.push(item);

  res.redirect("/");
});

app.listen(port, function() {
  console.log("Server started on port " + port + ".");
});
