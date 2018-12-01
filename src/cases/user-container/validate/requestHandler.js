module.exports = ({
  validate,
  apiResponses
}) => (req, res) => {
  validate({ ...req.body
    })
    .on("validate-token.Success", apiResponses.ok(res))
};