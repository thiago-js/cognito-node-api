module.exports = ({ forgotPasswordConfirm, apiResponses }) => (req, res) => {
  forgotPasswordConfirm({ ...req.body })
    .on("forgot-confirm-user.Success", apiResponses.ok(res))
    .on("forgot-confirm-user.Error", apiResponses.badRequestWithMessage(res))
    .on(
      "forgot-confirm-user.ValidationCode",
      apiResponses.badRequestWithMessage(res)
    )
    .on(
      "forgot-confirm-user.ValidationNewPassword",
      apiResponses.badRequestWithMessage(res)
    )
    .on(
      "forgot-confirm-user.ValidationUsername",
      apiResponses.badRequestWithMessage(res)
    );
};
