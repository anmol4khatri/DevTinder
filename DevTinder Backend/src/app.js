const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

//Signup a new user
app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        res.status(200).send("User data saved successfully");
    } catch(err){
        res.status(500).send("Oops!! Something Went Wrong");
    }
});

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