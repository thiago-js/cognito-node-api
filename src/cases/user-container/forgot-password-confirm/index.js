const forgotPasswordConfirm = require("./useCase");
const requestHandler = require("./requestHandler");

module.exports = ({ apiResponses }) =>
  requestHandler({
    forgotPasswordConfirm,
    apiResponses
  });
