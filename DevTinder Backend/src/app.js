const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());



connectDB()
    .then(() => {
        console.log("Connection with the database established");
        app.listen(7777, () => {
            console.log("Server is listening at port 7777");
        });
    })
    .catch(() => {
        console.error("Something went wrong while connecting to the database");
    })