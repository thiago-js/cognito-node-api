const EventEmitter = require("events");
const factory = require("error-factory");
const { UserPool } = require("../../../../config/aws/aws-cognito");

const mediator = new EventEmitter();

const _ValidationUsername = factory("ValidationUsernameError");

const ValidationUsername = value =>
  value ? Promise.resolve(value) : Promise.reject(_ValidationUsername());

const emitValidationUsername = err =>
  mediator.emit("forgot-password-user.ValidationUsername", err);

const emitSuccess = result =>
  mediator.emit("forgot-password-user.Success", result);

const emitError = err => mediator.emit("forgot-password-user.Error", err);

const forgotPassword = (username, type) => {
  const { CognitoUser } = UserPool(type);
  const Cognito = CognitoUser(username.replace("@", "_"));

  Cognito.forgotPassword({
    onSuccess: result => {
      Promise.resolve(emitSuccess({ message: "SUCCESS" }));
    },
    onFailure: err => Promise.resolve(emitError(err))
  });
};

module.exports = ({ username, type }) => {
  ValidationUsername(username)
    .then(() => forgotPassword(username, type))
    .catch(_ValidationUsername, emitValidationUsername);

  return mediator;
};
