const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const authController = require("../controller/authController");

router.post("/", authController.login);
router.post("/reg", verifyToken, authController.registerEmployee);
router.get("/role", authController.getRole);

module.exports = router;
