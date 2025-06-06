const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const userRouter = require("./routes/userRouter");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", userRouter);

//Start the server and connect to the database
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