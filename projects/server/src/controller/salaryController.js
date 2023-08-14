const db = require("../../models");
const { Op } = require("sequelize");

const salaryController = {
  calculateSalary: async (req, res) => {
    try {
      const { userID } = req.body; // Ambil userID dari request body

      const history = await db.History.findOne({
        where: { userID, ClockIn: { [Op.ne]: null } },
        order: [["ClockIn", "DESC"]],
      });

      if (!history) {
        return res.status(400).json({ message: "No clock-in history found" });
      }
      // Get current month and year
      const now = history.ClockIn;
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      // Find all history records for the current month and year and specific userID
      const historyRecords = await db.History.findAll({
        where: {
          userID, // Filter berdasarkan userID
          Month: currentMonth,
          createdAt: {
            [Op.between]: [
              new Date(currentYear, currentMonth - 1, 1), // First day of the month
              new Date(currentYear, currentMonth, 0), // Last day of the month
            ],
          },
        },
      });

      // Calculate total salary and total deduction
      let totalSalary = 0;
      let totalDeduction = 0;

      historyRecords.forEach((history) => {
        totalSalary += history.DaySalary;
        totalDeduction += history.Deduction;
      });

      // Check if a Salary record exists for the current month and year
      const existingSalary = await db.Salary.findOne({
        where: {
          userID, // Filter berdasarkan userID
          Month: currentMonth,
          Year: currentYear,
        },
      });

      if (existingSalary) {
        // Update the existing Salary record
        existingSalary.TotalSalary = totalSalary;
        existingSalary.TotalDeduction = totalDeduction;
        await existingSalary.save();
      } else {
        // Create a new Salary record for the current month and year
        await db.Salary.create({
          userID, // Masukkan userID ke dalam record Salary
          Month: currentMonth,
          Year: currentYear,
          TotalSalary: totalSalary,
          TotalDeduction: totalDeduction,
        });
      }

      res.status(200).json({ message: "Salary calculation successful" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error calculating salary", error: error.message });
    }
  },

  getSalaryByUserID: async (req, res) => {
    try {
      const { userID } = req.params;

      // Find all Salary records for the given userID
      const salaryRecords = await db.Salary.findAll({
        where: { userID },
      });

      res.status(200).json({ message: "Success", salaryRecords });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = salaryController;