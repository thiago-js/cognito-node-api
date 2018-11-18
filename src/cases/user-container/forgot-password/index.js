const forgotPassword = require("./useCase");
const requestHandler = require("./requestHandler");

module.exports = ({ apiResponses }) =>
  requestHandler({
    forgotPassword,
    apiResponses
  });
