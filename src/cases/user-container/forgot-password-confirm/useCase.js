const EventEmitter = require("events");
const factory = require("error-factory");
const { CognitoUser } = require("../../../../config/aws/aws-cognito");

const mediator = new EventEmitter();

const _ValidationUsername = factory("ValidationUsername");
const _ValidationCode = factory("ValidationCode");
const _ValidationNewPassword = factory("ValidationNewPassword");

const ValidationUsername = value =>
  value ? Promise.resolve(value) : Promise.reject(_ValidationUsername());

const ValidationCode = value =>
  value ? Promise.resolve(value) : Promise.reject(_ValidationCode());

const ValidationNewPassword = value =>
  value ? Promise.resolve(value) : Promise.reject(_ValidationNewPassword());

const emitValidationUsername = err =>
  mediator.emit("forgot-confirm-user.ValidationUsername", err);

const emitValidationCode = err =>
  mediator.emit("forgot-confirm-user.ValidationCode", err);

const emitValidationNewPassword = err =>
  mediator.emit("forgot-confirm-user.ValidationNewPassword", err);

const emitSuccess = result =>
  mediator.emit("forgot-confirm-user.Success", result);

const emitError = err => mediator.emit("forgot-confirm-user.Error", err);

const forgotPasswordConfirm = (username, code, newPassword) => {
  const Cognito = CognitoUser(username.replace("@", "_"));

  Cognito.confirmPassword(code, newPassword, {
    onSuccess: result => Promise.resolve(emitSuccess({ message: "SUCCESS" })),
    onFailure: err => Promise.resolve(emitError(err))
  });
};

module.exports = ({ username, code, newPassword }) => {
  ValidationUsername(username)
    .then(() => ValidationCode(code))
    .then(() => ValidationNewPassword(newPassword))
    .then(() => forgotPasswordConfirm(username, code, newPassword))
    .catch(_ValidationUsername, emitValidationUsername)
    .catch(_ValidationCode, emitValidationCode)
    .catch(_ValidationNewPassword, emitValidationNewPassword);

  return mediator;
};
