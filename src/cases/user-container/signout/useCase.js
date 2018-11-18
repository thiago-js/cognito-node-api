const EventEmitter = require("events");
const factory = require("error-factory");
const { CognitoUser } = require("../../../../config/aws/aws-cognito");

const mediator = new EventEmitter();

const _ValidationUsername = factory("ValidationUsernameError");

const ValidationUsername = value =>
  value ? Promise.resolve(value) : Promise.reject(_ValidationUsername());

const emitValidationUsername = err =>
  mediator.emit("logout-user.ValidationUsername", err);

const emitSuccess = result => mediator.emit("logout-user.Success", result);

const emitError = err => mediator.emit("logout-user.Error", err);

const signOut = username => {
  const Cognito = CognitoUser(username.replace("@", "_"));

  Cognito.signOut();

  emitSuccess({ message: "SUCCESS" });
};

module.exports = ({ username }) => {
  ValidationUsername(username)
    .then(() => signOut(username))
    .catch(_ValidationUsername, emitValidationUsername);

  return mediator;
};
