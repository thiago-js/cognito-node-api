const signIn = require("./useCase");
const requestHandler = require("./requestHandler");

module.exports = ({ apiResponses }) =>
  requestHandler({
    signIn,
    apiResponses
  });
