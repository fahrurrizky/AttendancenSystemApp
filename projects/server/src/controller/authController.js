const db = require("../../models");
const User = db.User;
const { Op } = require("sequelize");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const handlebars = require("handlebars");
const fs = require("fs").promises;
const transporter = require("../helpers/transporter");

const kirimEmailRegis = async (email, user) => {
  let payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "1h",
  });
  const redirect = `http://localhost:3000/regis/${token}`;
  const data = await fs.readFile(path.resolve(__dirname, "../emails/registerEmployee.html"), "utf-8");
  const tesCompile = handlebars.compile(data);
  const tempResult = tesCompile({ email, redirect });

  await transporter.sendMail({
    to: email,
    subject: "Register Employee",
    html: tempResult,
  });
};

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(500).json({ message: "User not Found" });
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(400).json({ message: "password salah" });
      const payload = { id: user.id };
      const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: "24h",
      });
      user.isLogin = true;
      await user.save();
      return res.status(200).json({ message: "success", user, token });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },

  registerEmployee: async (req, res) => {
    try {
      const { email, roleID, baseSalary } = req.body;
      if (!email || !roleID || !baseSalary) {
        return res.status(400).json({ error: "Data tidak lengkap" });
      }
      const cekUser = await User.findOne({ where: { [Op.or]: [{ email }] } });
      if (cekUser) return res.status(400).json({ message: "Email sudah terdaftar" });
      console.log(1);

      db.sequelize.transaction(async (t) => {
        const user = await User.create({ email, roleID, baseSalary }, { transaction: t });
        await kirimEmailRegis(email, user);
        return res.status(200).json({ message: "register berhasil", user });
      });
      console.log(1);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },

  getRole: async (req, res) => {
    try {
      const result = await db.Role.findAll({
        where: {
          id: { [Op.gt]: 1 },
        },
      });
      return res.status(200).json({ message: "success", result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
};

module.exports = authController;
