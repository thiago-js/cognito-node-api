const confirmUser = require("./useCase");
const requestHandler = require("./requestHandler");

module.exports = ({ apiResponses }) =>
  requestHandler({
    confirmUser,
    apiResponses
  });
