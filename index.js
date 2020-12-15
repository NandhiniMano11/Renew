const express = require("express") // our express server
const app = express() // generate an app object
const bodyParser = require("body-parser") // requiring the body-parser
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());// telling the app that we are going to use json to handle incoming payload
app.listen(4000, () => {
  console.info(`server started...`)// print this when the server starts

})
app.route('/renewal').post(function (req, res) {
  var inputdate = req.body.inputdate;
  if (ValidateDate(inputdate)) {
    var dateParts = inputdate.split("-");
    if (req.body.type == '1' || req.body.type == 'postpaid') {
      var date = parseInt(dateParts[0]) + getDaysInMonth(dateParts[1], dateParts[2]) - 1;
      var renewaldate = date + "-" + dateParts[1] + "-" + dateParts[2];
      res.send("<p>Renewal Date :   </p> <h4>"+renewaldate+"</h4>");
    } else if (req.body.type == '2' || req.body.type == 'prepaid') {
      var m = parseInt(dateParts[1]) + 1;
      var month = (m > 9) ? m : ("0" + m);
      var renewaldate = "01-" + month + "-" + dateParts[2];
      res.send("<p>Renewal Date :   </p> <h4>"+renewaldate+"</h4>");
    } else {
      res.send("Bad request");
    }
  } else {
    res.send("Invalid date format");
  }
});
function getDaysInMonth(m, y) {
  return /8|3|5|10/.test(--m) ? 30 : m == 1 ? (!(y % 4) && y % 100) || !(y % 400) ? 29 : 28 : 31;
}
function ValidateDate(dtValue) {
  var dtRegex = new RegExp("^([0]?[1-9]|[1-2]\\d|3[0-1])-(01|02|03|04|05|06|07|08|09|10|11|12)-[1-2]\\d{3}$", 'i');
  return dtRegex.test(dtValue);
}
