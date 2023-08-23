const express = require("express");
const app = express();
app.use(express.json());
const path = require("path");
const cors = require("cors");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const PORT = process.env.PORT || 8000;
app.use(
  cors({
    origin: [
      process.env.WHITELISTED_DOMAIN &&
        process.env.WHITELISTED_DOMAIN.split(","),
    ],
  })
);
const db = require("../models");

// const { join } = require("path");

// db.sequelize.sync({ alter: true });

// app.use(cors())


//#region API ROUTES

const {
  authRouter,
  attendRouter,
  salaryRouter,
} = require("./routers");
// ===========================
// NOTE : Add your routes here

app.use(
  "/api",
  authRouter,
  attendRouter,
  salaryRouter,
);
// app.use("/public", express.static(path.resolve(__dirname, "../public")));

// app.get("/api", (req, res) => {
//   res.send(`Hello, this is my API`);
// });

// app.get("/api/greetings", (req, res, next) => {
//   res.status(200).json({
//     message: "Hello, Student !",
//   });
// });

// app.get;

// // ===========================

// // not found
// app.use((req, res, next) => {
//   if (req.path.includes("/api/")) {
//     res.status(404).send("Not found !");
//   } else {
//     next();
//   }
// });

// // error
// app.use((err, req, res, next) => {
//   if (req.path.includes("/api/")) {
//     console.error("Error : ", err.stack);
//     res.status(500).send("Error !");
//   } else {
//     next();
//   }
// });

// //#endregion

// //#region CLIENT
// const clientPath = "../../client/build";
// app.use(express.static(join(__dirname, clientPath)));

// // Serve the HTML page
// app.get("*", (req, res) => {
//   res.sendFile(join(__dirname, clientPath, "index.html"));
// });

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});