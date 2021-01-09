// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;

// Main Page
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var calculator = req.body.calculator;
  var bmicalculator = req.body.bmicalculator;

  if (calculator) {
    res.redirect("/calculator");
    // res.sendFile(__dirname + "/calculator.html");
  } else if (bmicalculator) {
    res.redirect("/bmicalculator");
    // res.sendFile(__dirname + "/bmiCalculator.html");
  }

  // console.log("calcualtor: " + req.body.calculator);
  // console.log("bmi-calcualtor: " + req.body.bmicalculator);
});

// Calculator
app.get("/calculator", function(req, res) {
  res.sendFile(__dirname + "/calculator.html");
});

app.post("/calculator", function(req, res) {
  // console.log(req.body);
  var num1 = req.body.num1;
  var num2 = req.body.num2;
  var result = Number(num1) + Number(num2);

  res.send("The result of the calculation is " + result);
});

// BMI calculator
app.get("/bmicalculator", function(req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function(req, res) {
  var height = req.body.height;
  var weight = req.body.weight;
  var bmi = weight / (height * height);

  res.send("Your BMI is " + bmi + ".");
});

app.listen(port, function() {
  console.log("Server is running on " + port + ".");
});
