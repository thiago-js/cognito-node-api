const EventEmitter = require("events");
const factory = require("error-factory");
const { Cognito, Amazon } = require("../../../../config/aws/aws-cognito");

const mediator = new EventEmitter();

const ValidationUsername = factory("ValidationUsernameError");
const ValidationPassword = factory("ValidationPasswordError");
const ValidationPhone = factory("ValidationPhoneError");

const attributeAws = (username, phone) => {
  let attributeList = [];

  let dataEmail = { Name: "email", Value: username };
  let dataPhoneNumber = { Name: "phone_number", Value: phone };

  var attributeEmail = new Amazon.CognitoUserAttribute(dataEmail);
  var attributePhoneNumber = new Amazon.CognitoUserAttribute(dataPhoneNumber);

  attributeList.push(attributeEmail);
  attributeList.push(attributePhoneNumber);

  return attributeList;
};

const checkUsername = value =>
  value ? Promise.resolve(value) : Promise.reject(ValidationUsername());

const checkPassword = value =>
  value ? Promise.resolve(value) : Promise.reject(ValidationPassword());

const checkPhone = value =>
  value ? Promise.resolve(value) : Promise.reject(ValidationPhone());

const emitValidationUsernameError = err =>
  mediator.emit("create-user.ValidationUsernameError", err);

const emitValidationPassordError = err =>
  mediator.emit("create-user.ValidationPasswordError", err);

const emitValidationPhoneError = err =>
  mediator.emit("create-user.ValidationPhoneError", err);

const emitSuccess = result => mediator.emit("create-user.Success", result);

const emitErrorCreateUserCognito = err =>
  mediator.emit("create-user.ErrorCreateUserCognito", err);

const signUp = (username, password, phone) => {
  Cognito.signUp(
    username.replace("@", "_"),
    password,
    attributeAws(username, phone),
    null,
    (err, result) =>
      result
        ? Promise.resolve(emitSuccess(result))
        : Promise.reject(emitErrorCreateUserCognito(err))
  );
};

module.exports = ({ username, password, phone }) => {
  checkUsername(username)
    .then(() => checkPassword(password))
    .then(() => checkPhone(phone))
    .then(() => signUp(username, password, phone))
    .catch(ValidationUsername, emitValidationUsernameError)
    .catch(ValidationPassword, emitValidationPassordError)
    .catch(ValidationPhone, emitValidationPhoneError);

  return mediator;
};
