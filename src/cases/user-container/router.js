const createUser = require("./create");
const confirmUser = require("./confirm");
const resendUser = require("./resend-code");
const signIn = require("./signin");
const signOut = require("./signout");
const forgotPassword = require("./forgot-password");
const forgotPasswordConfirm = require("./forgot-password-confirm");

const { Router } = require("express");

module.exports = ({ apiResponses }) => {
  const router = Router();

  router.post("/user/create", createUser({ apiResponses }));
  router.post("/user/confirm", confirmUser({ apiResponses }));
  router.post("/user/resend", resendUser({ apiResponses }));
  router.post("/user/signIn", signIn({ apiResponses }));
  router.post("/user/signOut", signOut({ apiResponses }));
  router.post("/user/forgot-password", forgotPassword({ apiResponses }));

  router.post(
    "/user/forgot-password-confirm",
    forgotPasswordConfirm({ apiResponses })
  );

  router.get("api/user/private", (req, res) => {
    res.json({ message: "Esta authenticado" });
  });

  return router;
};
