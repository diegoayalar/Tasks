const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");
const projectRouter = require("./routes/projectRoutes");
const CustomError = require("./utils/customError");
const globalErrorHandler = require("./controllers/errorController");
const { authToken } = require("./utils/authToken");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.static("public"));
app.use(express.json());  
app.use(cookieParser());
app.use(cors());

// view engine
app.set("view engine", "ejs");

app.use(
  logger("common", {
    stream: fs.createWriteStream("./logger.log", { flags: "a" }),
  })
);

app.use(logger("dev"));

app.get("/login", (req, res) => res.render("login"));
app.get("/signup", (req, res) => res.render("signup"));
app.get("/index", authToken, (req, res) => res.render("index")); // Protected route
app.get("/tasks", authToken, (req, res) => res.render("tasks")); // Protected route

app.use("/users", userRouter);
app.use("/tasks", taskRouter);
app.use("/projects", projectRouter);

app.all("*", (req, res, next) => {
  const err = new CustomError(`Can't find ${req.originalUrl} on the server`, 404);
  next(err);
});

app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
