module.exports = ({ confirmUser, apiResponses }) => (req, res) => {
  confirmUser({ ...req.body })
    .on("confirm-user.Success", apiResponses.ok(res))
    .on("confirm-user.Error", apiResponses.badRequestWithMessage(res))
    .on("confirm-user.ValidationCode", apiResponses.badRequestWithMessage(res))
    .on(
      "confirm-user.ValidationUsername",
      apiResponses.badRequestWithMessage(res)
    );
};
