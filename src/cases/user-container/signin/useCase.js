const EventEmitter = require("events");
const factory = require("error-factory");
const {
  CognitoUser,
  AuthenticationDetails
} = require("../../../../config/aws/aws-cognito");

const mediator = new EventEmitter();

const _ValidationUsername = factory("ValidationUsernameError");
const _ValidationPassword = factory("ValidationPasswordError");

const ValidationUsername = value =>
  value ? Promise.resolve(value) : Promise.reject(_ValidationUsername());

const ValidationPassword = value =>
  value ? Promise.resolve(value) : Promise.reject(_ValidationPassword());

const emitValidationUsername = err =>
  mediator.emit("authenticate-user.ValidationUsername", err);

const emitValidationPassword = err =>
  mediator.emit("authenticate-user.ValidationPassword", err);

const emitSuccess = result =>
  mediator.emit("authenticate-user.Success", result);
const emitError = err => mediator.emit("authenticate-user.Error", err);

const signIn = (username, password) => {
  const Cognito = CognitoUser(username.replace("@", "_"));

  const auth = AuthenticationDetails(username, password);

  Cognito.authenticateUser(auth, {
    onSuccess: result => {
      Promise.resolve(emitSuccess(result));
    },
    onFailure: err => {
      Promise.reject(emitError(err));
    }
  });
};

module.exports = ({ username, password }) => {
  ValidationUsername(username)
    .then(() => ValidationPassword(password))
    .then(() => signIn(username, password))
    .catch(_ValidationUsername, emitValidationUsername)
    .catch(_ValidationPassword, emitValidationPassword);

  return mediator;
};
