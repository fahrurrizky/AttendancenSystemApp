const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const attendController = require("../controller/attendControllers");

router.post("/employee/clock-in",  attendController.clockIn);
router.post("/employee/clock-out", attendController.clockOut);
router.get("/employee/attendance-history/:userID", attendController.getHistoryByUserId);


module.exports = router;