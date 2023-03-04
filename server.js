require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const winston = require("winston");
const helmet = require("helmet");
const express = require("express");
const ReminderRoutes = require("./routes/ReminderRoutes");
const UserRoutes = require("./routes/UserRoutes");
const FilterRoutes = require("./routes/FilterRoutes");
const LabelRoutes = require("./routes/LabelRoutes");
const ProjectRoutes = require("./routes/ProjectRoutes");

const app = express();

app.use(cors());

// middleware
app.use(express.json());

// prevent XSS attacks
app.use(helmet());
app.use((req, res, next) => {
  winston.log("info", "Request received");
  next();
});

// routes
app.use("/reminder", ReminderRoutes);
app.use("/user", UserRoutes);
app.use("/filter", FilterRoutes);
app.use("/label", LabelRoutes);
app.use("/project", ProjectRoutes);
const PORT = process.env.PORT || 3000;

// connect to db with mongoose
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    winston.log("info", "Connected to DB");
  })
  .catch((err) => {
    winston.error(err);
  });

app.listen(PORT, () => {
  winston.log("info", `Server is running on port ${PORT}`);
});
