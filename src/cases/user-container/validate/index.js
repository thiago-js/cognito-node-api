const validate = require("./useCase");
const requestHandler = require("./requestHandler");

module.exports = ({
    apiResponses
  }) =>
  requestHandler({
    validate,
    apiResponses
  });