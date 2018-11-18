const config = require("../config");
const AWS = require("aws-sdk");
const CognitoSDK = require("amazon-cognito-identity-js-node");
const Amazon = require("amazon-cognito-identity-js");

AWS.AuthenticationDetails = CognitoSDK.AuthenticationDetails;
AWS.CognitoIdentityServiceProvider.CognitoUserPool = CognitoSDK.CognitoUserPool;
AWS.CognitoIdentityServiceProvider.CognitoUser = CognitoSDK.CognitoUser;

var poolData = {
  UserPoolId: config.UserPoolId,
  ClientId: config.ClientId
};

const Cognito = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(
  poolData
);

const CognitoUser = username => {
  var userData = {
    Username: username,
    Pool: Cognito
  };

  return new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);
};

const AuthenticationDetails = (username, password) => {
  var authenticationData = {
    Username: username,
    Password: password
  };

  return new AWS.AuthenticationDetails(authenticationData);
};

module.exports = { Cognito, CognitoUser, AuthenticationDetails, Amazon };
