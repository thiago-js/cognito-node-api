const createUser = require("./useCase");
const requestHandler = require("./requestHandler");

module.exports = ({ apiResponses }) =>
  requestHandler({
    createUser,
    apiResponses
  });
