const db = require("../../models");
const { Op } = require("sequelize");

const isClockedIn = async (userID) => {
  const existingHistory = await db.History.findOne({
    where: { userID, ClockOut: null },
  });
  return existingHistory !== null;
};

const attendanceController = {
  clockIn: async (req, res) => {
    try {
      const { userID } = req.body;

      const userIsClockedIn = await isClockedIn(userID);
      if (userIsClockedIn) {
        return res.status(400).json({ message: "User is already clocked in" });
      }

      const now = new Date();
      const month = now.getMonth() + 1;

      // Create a new history entry for clock in with ClockOut set to null
      await db.History.create({
        userID,
        ClockIn: new Date(),
        ClockOut: null,
        HourlyWorks: 0, // Initialize HourlyWorks to 0
        DaySalary: 0, // Initialize DaySalary to 0
        isOvertime: false, // Initialize isOvertime to false
        Month: month,
      });

      res.status(200).json({ message: "Clock In Successful", userID });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  clockOut: async (req, res) => {
    try {
      const { userID } = req.body;

      console.log("Clock out requested for userID:", userID);

      // Find the latest history entry for the user where ClockOut is null
      const history = await db.History.findOne({
        where: { userID, ClockOut: null },
        order: [["ClockIn", "DESC"]],
      });

      const user = await db.User.findOne({
        where: { id: userID },
      });

      console.log("Retrieved history:", history);

      if (!history) {
        return res.status(400).json({ message: "User is not clocked in" });
      }

      // Update the clock out time and calculate HourlyWorks and DaySalary
      history.ClockOut = new Date();
      const timeDiffMilliseconds = history.ClockOut - history.ClockIn;
      const hoursWorked = timeDiffMilliseconds / (1000 * 60 * 60);

      history.HourlyWorks = hoursWorked;

      if (hoursWorked > 12) {
        history.DaySalary = user.daySalary / 2;
        history.Deduction = user.daySalary / 2; 
      } else if (!history.ClockIn) {
        history.DaySalary = 0; 
        history.Deduction = user.daySalary
      } else if (hoursWorked <= 11) {
        history.DaySalary = user.daySalary / 2;
        history.Deduction = user.daySalary / 2; 
      }
      await history.save();

      await user.update({
        income: user.income + history.DaySalary
      })

      console.log("Hours Worked:", hoursWorked);

      console.log("Day Salary:", history.DaySalary);

      res.status(200).json({ message: "Clock Out Successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  

  getHistoryByUserId: async (req, res) => {
    try {
      const { userID } = req.params;

      // Find history records for the given user ID
      const historyRecords = await db.History.findAll({
        where: { userID },
      });

      res.status(200).json({ message: "Success", history: historyRecords });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  
};

module.exports = attendanceController;