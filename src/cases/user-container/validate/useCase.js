const EventEmitter = require("events");
const factory = require("error-factory");
const {
  UserPool
} = require("../../../../config/aws/aws-cognito");

const mediator = new EventEmitter();

const emitSuccess = result =>
  mediator.emit("validate-token.Success", result);

const IsTokenValid = (accessToken, type) => {
  const {
    TokenValidator
  } = UserPool(type);

  TokenValidator.validate(accessToken, function (error, user) {
    if (error) {
      emitSuccess({
        valid: false,
        error
      });
    } else {
      emitSuccess({
        valid: true,
        user
      });
    }
  });
};

module.exports = ({
  accessToken,
  type
}) => {
  IsTokenValid(accessToken, type)
  return mediator;
};