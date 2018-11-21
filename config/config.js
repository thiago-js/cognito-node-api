const config = {
  port: 3000,
  Pools: {
    "easybarber-admin": {
      UserPoolId: "USER_POLL_ID_COGNITO",
      ClientId: "CLIENT_ID_COGNITO"
    },
    "easybarber-api": {
      UserPoolId: "USER_POLL_ID_COGNITO",
      ClientId: "CLIENT_ID_COGNITO"
    }
  }
};

module.exports = config;
