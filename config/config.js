const config = {
  port: process.env.PORT || 5001,
  Pools: {
    customers: {
      Region: "us-east-1",
      UserPoolId: "us-east-1_dzPkMpUJM",
      ClientId: "6ibatks17tj0i20fhml6nclmda"
    }
  }
};

module.exports = config;