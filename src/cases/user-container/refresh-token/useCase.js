const EventEmitter = require("events");
const factory = require("error-factory");
const {
  UserPool
} = require("../../../../config/aws/aws-cognito");

const mediator = new EventEmitter();

const emitSuccess = result =>
  mediator.emit("refresh-token.Success", result);
const emitError = result =>
  mediator.emit("refresh-token.Error", result);

const RefreshToken = (req, username, refreshToken, type) => {
  const {
    CognitoUser
  } = UserPool(type);
  const tokens = req.user;

  const Cognito = CognitoUser(username.replace("@", "_"));
  Cognito.refreshSession({
    getToken: () => refreshToken
  }, (err, session) => {
    if (err) {
      emitError({
        err
      })
    } else {
      emitSuccess({
        ...session
      })
    }
  });
};

module.exports = ({
  username,
  refreshToken,
  type
}, req, res) => {
  RefreshToken(req, username, refreshToken, type)
  return mediator;
};