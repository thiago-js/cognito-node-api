const config = {
  port: 3000,
  Pools: {
    default: {
      UserPoolId: "USER_POLL_ID_COGNITO",
      ClientId: "CLIENT_ID_COGNITO"
    },
    userPoolTest: {
      UserPoolId: "USER_POLL_ID_COGNITO",
      ClientId: "CLIENT_ID_COGNITO"
    }
  }
};

module.exports = config;
