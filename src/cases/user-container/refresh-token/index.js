const refreshToken = require("./useCase");
const requestHandler = require("./requestHandler");

module.exports = ({
    apiResponses
  }) =>
  requestHandler({
    refreshToken,
    apiResponses
  });