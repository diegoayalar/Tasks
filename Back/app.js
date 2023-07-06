const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");
const projectRouter = require("./routes/projectRoutes");
const CustomError = require("./utils/customError");
const globalErrorHandler = require("./controllers/errorController");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

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
app.get("/index", authenticateToken, (req, res) => res.render("index")); // Protected route

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

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
  const token = req.cookies.token; // Get the token from the cookie

  if (!token) {
    return res.redirect("/login"); // Redirect to the login page if the token is missing
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded; // Set the decoded user data to the request object
    next();
  } catch (error) {
    return res.redirect("/login"); // Redirect to the login page if the token is invalid
  }
}