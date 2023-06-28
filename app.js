const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");
const projectRouter = require("./routes/projectRoutes");
const CustomError = require("./utils/customError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.json());

app.use(
    logger("common", {
        stream: fs.createWriteStream("./logger.log", { flags: "a" }),
    })
);

app.use(logger("dev"));

app.use("/users", userRouter);
app.use("/tasks", taskRouter);
app.use("/projects", projectRouter);

app.all("*", (req, res, next) => {
    const err = new CustomError(
        `Can't find ${req.originalUrl} on the server`,
        404
    );
    next(err);
});

app.use(globalErrorHandler);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
