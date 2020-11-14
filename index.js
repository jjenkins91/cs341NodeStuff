const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/calculator.html");
});


app.post("/result", function(req, res) {

  var weight = Number(req.body.weight);

  var mailType = req.body.mail;
  var rate;

  if (mailType === "Letters Stamped" && weight === 1) {
    rate = 0.55;
  } else if (mailType === "Letters Stamped") {
    rate = (weight * .15) + 0.55 - .15;
  }

  if (mailType === "Letters Metered" && weight === 1) {
    rate = 0.50;
  } else if (mailType === "Letters Metered") {
    rate = (weight * .15) + 0.50 - .15;
  }

  if (mailType === "Large Envelopes" && weight === 1) {
    rate = 1.00;
  } else if (mailType === "Large Envelopes") {
    rate = (weight * .20) + 1.00 - .20;
  }

  if (mailType === "First Class Package Service" && weight < 5) {
    rate = 3.80;
  } else if (mailType === "First Class Package Service" && weight < 8) {
    rate = 4.60;
  } else if (mailType === "First Class Package Service" && weight < 12) {
    rate = 5.30;
  } else if (mailType === "First Class Package Service" && weight < 14) {
    rate = 5.90;
  }

  res.render("calculator", {thePackage: mailType});
  // res.render("calculator", {
  //   theWeight: weight
  // });
  // res.render("calculator", {
  //   theRate: rate
  // });
  // res.send("Package Type: " + mailType + " Weight: " + weight + " oz. " + "Rate: " + rate.toFixed(2));
});
var port = process.env.PORT || 3000 ;
app.listen(port, function() {
  console.log("Running on port 3000");
});
