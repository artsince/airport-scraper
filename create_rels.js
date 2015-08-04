"use strict";

var fs = require("fs");
var stringify = require("csv-stringify");

var obj = JSON.parse(fs.readFileSync("output.json", "utf8"));

var output = "";

var stringifier = stringify({ delimiter: "," });
stringifier.on("readable", function() {
  var row;
  while ((row = stringifier.read())) {
    output += row;
  }
});

stringifier.on("finish", function() {
  fs.writeFileSync("rels.csv", output, "utf8");
});

stringifier.write([
  "NODE TYPE",
  "NODE NAME",
  "EDGE TYPE",
  "NODE TYPE",
  "NODE NAME",
  "Weight"
]);

Object.keys(obj).forEach(function (airport) {
  obj[airport].destinations.forEach(function (dest) {
    stringifier.write([
      "Airport",
      airport,
      "HAS A FLIGHT TO",
      "Airport",
      dest,
      1
    ]);
  });
});

stringifier.end();
