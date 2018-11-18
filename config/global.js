const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("../src/cases/user-container/router");
const apiResponses = require("../apiResponses");

global.Promise = require("bluebird");

module.exports = app => {
  app.use(morgan("dev"));
  app.set("json spaces", 4);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  app.use(router({ apiResponses }));
};
