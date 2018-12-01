const config = {
  port: process.env.PORT || 5001,
  Pools: {
    default: {
      Region: "USER_POLL_REGION",
      UserPoolId: "USER_POLL_ID_COGNITO",
      ClientId: "CLIENT_ID_COGNITO"
    }
  }
};

module.exports = config;