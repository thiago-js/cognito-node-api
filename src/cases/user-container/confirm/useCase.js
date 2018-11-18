const EventEmitter = require("events");
const factory = require("error-factory");
const { CognitoUser } = require("../../../../config/aws/aws-cognito");

const mediator = new EventEmitter();

const _ValidationUsername = factory("ValidationUsernameError");
const _ValidationCode = factory("ValidationCodeError");

const ValidationUsername = value =>
  value ? Promise.resolve(value) : Promise.reject(_ValidationUsername());

const ValidationCode = value =>
  value ? Promise.resolve(value) : Promise.reject(_ValidationCode());

const emitValidationUsername = err =>
  mediator.emit("confirm-user.ValidationUsername", err);

const emitValidationCode = err =>
  mediator.emit("confirm-user.ValidationCode", err);

const emitSuccess = result => mediator.emit("confirm-user.Success", result);
const emitError = err => mediator.emit("confirm-user.Error", err);

const ConfirmCode = (username, code) => {
  const Cognito = CognitoUser(username.replace("@", "_"));

  Cognito.confirmRegistration(code, true, (err, result) =>
    result
      ? Promise.resolve(emitSuccess(result))
      : Promise.reject(emitError(err))
  );
};

module.exports = ({ username, code }) => {
  ValidationUsername(username)
    .then(() => ValidationCode(code))
    .then(() => ConfirmCode(username, code))
    .catch(_ValidationUsername, emitValidationUsername)
    .catch(_ValidationCode, emitValidationCode);

  return mediator;
};
