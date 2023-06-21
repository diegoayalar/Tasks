const express = require("express");
const mongoose = require("mongoose");

const URI = "mongodb://0.0.0.0:27017/tasks";

//Connection
const connection = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Succesful connection");
    } catch (error) {
        console.log(error);
    }
};

const userRouter = require("./routes/userRoutes");
const app = express();

connection()

app.use(express.json());
app.use("/users", userRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
