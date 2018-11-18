module.exports = ({ signOut, apiResponses }) => (req, res) => {
  signOut({ ...req.body })
    .on("logout-user.Success", apiResponses.ok(res))
    .on("logout-user.Error", apiResponses.badRequestWithMessage(res))
    .on(
      "logout-user.ValidationUsername",
      apiResponses.badRequestWithMessage(res)
    );
};
