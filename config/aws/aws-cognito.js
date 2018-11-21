const config = require("../config");
const AWS = require("aws-sdk");
const CognitoSDK = require("amazon-cognito-identity-js-node");
const Amazon = require("amazon-cognito-identity-js");

const PoolsCognito = {};

AWS.AuthenticationDetails = CognitoSDK.AuthenticationDetails;
AWS.CognitoIdentityServiceProvider.CognitoUserPool = CognitoSDK.CognitoUserPool;
AWS.CognitoIdentityServiceProvider.CognitoUser = CognitoSDK.CognitoUser;

Object.keys(config.Pools).map(function(key) {
  const poolData = {
    UserPoolId: config.Pools[key].UserPoolId,
    ClientId: config.Pools[key].ClientId
  };

  PoolsCognito[key] = {
    Cognito: new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData),
    CognitoUser: username => {
      const userData = { Username: username, Pool: PoolsCognito[key].Cognito };
      return new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);
    }
  };
});

const AuthenticationDetails = (username, password) => {
  var authenticationData = { Username: username, Password: password };
  return new AWS.AuthenticationDetails(authenticationData);
};

const UserPool = type => {
  return type ? PoolsCognito[type] : PoolsCognito[Object.keys(PoolsCognito)[0]];
};

module.exports = { UserPool, AuthenticationDetails, Amazon };
