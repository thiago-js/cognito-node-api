module.exports = ({ resendUser, apiResponses }) => (req, res) => {
  resendUser({ ...req.body })
    .on("resend-user.Success", apiResponses.ok(res))
    .on("resend-user.Error", apiResponses.badRequestWithMessage(res))
    .on(
      "resend-user.ValidationUsername",
      apiResponses.badRequestWithMessage(res)
    );
};
