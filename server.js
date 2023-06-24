const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_LOCAL;

mongoose
    .connect(DB)
    .then((connection) => {
        console.log("succesful connection");
    })
    .catch((err) => {
        console.log(err);
    });
