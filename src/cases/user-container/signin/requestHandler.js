module.exports = ({ signIn, apiResponses }) => (req, res) => {
  signIn({ ...req.body })
    .on("authenticate-user.Success", apiResponses.ok(res))
    .on("authenticate-user.Error", apiResponses.badRequestWithMessage(res))
    .on(
      "authenticate-user.ValidationUsername",
      apiResponses.badRequestWithMessage(res)
    )
    .on(
      "authenticate-user.ValidationPassword",
      apiResponses.badRequestWithMessage(res)
    );
};
