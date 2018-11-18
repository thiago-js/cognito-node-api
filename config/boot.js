global.Promise = require("bluebird");

const config = require("./config");
const globalConfiguration = require("./global");
const express = require("express");
const app = express();

module.exports = () => {
  // loading global configurations
  globalConfiguration(app);

  // create server
  app.listen(config.port, () =>
    console.log(`Servidor executando na porta ${config.port.toString()}`)
  );
};
