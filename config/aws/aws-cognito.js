const config = require("../config");
const AWS = require("aws-sdk");
const CognitoSDK = require("amazon-cognito-identity-js-node");
const Amazon = require("amazon-cognito-identity-js");
const Validator = require("../../src/lib/Validator");

const PoolsCognito = {};

AWS.AuthenticationDetails = CognitoSDK.AuthenticationDetails;
AWS.CognitoIdentityServiceProvider.CognitoUserPool = CognitoSDK.CognitoUserPool;
AWS.CognitoIdentityServiceProvider.CognitoUser = CognitoSDK.CognitoUser;

Object.keys(config.Pools).map(function (key) {

  const {
    UserPoolId,
    ClientId,
    Region
  } = config.Pools[key]

  const poolData = {
    UserPoolId,
    ClientId
  };

  PoolsCognito[key] = {
    Cognito: new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData),
    CognitoUser: username => {
      const userData = {
        Username: username,
        Pool: PoolsCognito[key].Cognito
      };
      return new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);
    },
    TokenValidator: new Validator({
      region: Region,
      cognitoUserPoolId: UserPoolId,
      tokenUse: "access",
      tokenExpiration: 3600000
    })
  };
});

const AuthenticationDetails = (username, password) => {
  var authenticationData = {
    Username: username,
    Password: password
  };
  return new AWS.AuthenticationDetails(authenticationData);
};

const UserPool = type => {
  return type ? PoolsCognito[type] : PoolsCognito[Object.keys(PoolsCognito)[0]];
};

module.exports = {
  UserPool,
  AuthenticationDetails,
  Amazon
};