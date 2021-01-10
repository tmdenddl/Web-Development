// jshint esversion:6

// NPM packages used
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

// Global Variables
const port = 3000;

// Express Server
const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  // Format that MailChimp wants the data to be sent as
  const data = {
    members: [
      {
        email_address: email,
        status: "Subscribed",
        merge_fileds: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  // const url = "https://${API_SERVER}.api.mailchimp.com/3.0/lists/${LIST_ID}
  const url = "https://us7.api.mailchimp.com/3.0/lists/afae90f7a8";

  const options = {
    method: "POST",
    auth: "kevin:f0e583cbf1b8157301ec508bba10fe3b-us7"
  };

  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

  console.log(firstName, lastName, email);
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || port, function() {
  console.log("Server is running on " + port + ".");
});

// APIKey
// f0e583cbf1b8157301ec508bba10fe3b-us7

// MailChimp Unique List ID
// afae90f7a8
