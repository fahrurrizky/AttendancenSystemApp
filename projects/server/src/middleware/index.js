const { verifyToken } = require("./auth");
const { multerUpload } = require("./multer");
const {
  validateLogin,
  validateRegister,
  validateChangeUsername,
  validateChangeEmail,
  validateResetPassword,
  validateForgotPassword,
  validate,
} = require("./validation");

module.exports = {
  verifyToken,
  validate,
};
