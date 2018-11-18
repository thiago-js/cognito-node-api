const resendUser = require("./useCase");
const requestHandler = require("./requestHandler");

module.exports = ({ apiResponses }) =>
  requestHandler({
    resendUser,
    apiResponses
  });
