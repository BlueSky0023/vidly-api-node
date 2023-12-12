const winston = require("winston");
const express = require("express");
const config = require("config");
const bodyParser = require('body-parser'); // Import body-parser module
const app = express();

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  console.log('Received registration request');
  // Handle the POST request logic here
});

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
