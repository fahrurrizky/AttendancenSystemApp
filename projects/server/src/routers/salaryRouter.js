const express = require("express");
const router = express.Router();
const salaryController = require("../controller/salaryController");

router.post("/employee/salary", salaryController.calculateSalary)
router.get("/employee/salary/:userID", salaryController.getSalaryByUserID);

module.exports = router;