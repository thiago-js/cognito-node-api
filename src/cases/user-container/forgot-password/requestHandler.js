module.exports = ({ forgotPassword, apiResponses }) => (req, res) => {
  forgotPassword({ ...req.body })
    .on("forgot-password-user.Success", apiResponses.ok(res))
    .on("forgot-password-user.Error", apiResponses.badRequestWithMessage(res))
    .on(
      "forgot-password-user.ValidationUsername",
      apiResponses.badRequestWithMessage(res)
    );
};
