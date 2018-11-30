const EventEmitter = require("events");
const factory = require("error-factory");
const {
  UserPool
} = require("../../../../config/aws/aws-cognito");

const mediator = new EventEmitter();

const _ValidationUsername = factory("ValidationUsernameError");

const ValidationUsername = value =>
  value ? Promise.resolve(value) : Promise.reject(_ValidationUsername());

const emitValidationUsername = err =>
  mediator.emit("logout-user.ValidationUsername", err);

const emitSuccess = result => mediator.emit("logout-user.Success", result);

const signOut = (username, type) => {
  const {
    CognitoUser
  } = UserPool(type);
  const Cognito = CognitoUser(username.replace("@", "_"));

  Cognito.signOut();

  emitSuccess({
    message: "SUCCESS"
  });
};

module.exports = ({
  username,
  type
}) => {
  ValidationUsername(username)
    .then(() => signOut(username, type))
    .catch(_ValidationUsername, emitValidationUsername);

  return mediator;
};