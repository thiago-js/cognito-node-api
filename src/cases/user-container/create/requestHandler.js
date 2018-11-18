module.exports = ({ createUser, apiResponses }) => (req, res) => {
  createUser({ ...req.body })
    .on("create-user.Success", apiResponses.ok(res))
    .on(
      "create-user.ErrorCreateUserCognito",
      apiResponses.badRequestWithMessage(res)
    )
    .on(
      "create-user.ValidationUsernameError",
      apiResponses.badRequestWithMessage(res)
    )
    .on(
      "create-user.ValidationPasswordError",
      apiResponses.badRequestWithMessage(res)
    )
    .on(
      "create-user.ValidationPhoneError",
      apiResponses.badRequestWithMessage(res)
    );
};
