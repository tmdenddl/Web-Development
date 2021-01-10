// jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "29d77df9c138652914c2b61fbda84a7b";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data){
      // String -> JSON
      const weatherData = JSON.parse(data);
      // JSON -> String
      const weatherString = JSON.stringify(weatherData);

      // Retrieving data from JSON
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      // Data to be sent as response
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>Temperature in " + query + " is " + temp + "degress Celcius.</h1>");
      res.write("<img src=" + imageURL + ">");

      res.send();
    });
  });
});

app.get("/", function(req, res) {

});

app.listen(3000, function() {
  console.log("Server is running on " + port + ".");
});
