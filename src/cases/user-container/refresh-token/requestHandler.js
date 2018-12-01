module.exports = ({
  refreshToken,
  apiResponses
}) => (req, res) => {
  refreshToken({ ...req.body
    }, req, res)
    .on("refresh-token.Success", apiResponses.ok(res))
    .on("refresh-token.Error", apiResponses.badRequestWithMessage(res))

};