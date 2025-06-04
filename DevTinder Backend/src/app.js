const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validate");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

//Signup a new user
app.post("/signup", async (req, res) => {
    const { firstName, lastName, emailId, password, age, gender, photoUrl, about, skills } = req.body;
    try {
        validateSignUpData(req); //API Level data validation
        const passwordHashed = await bcrypt.hash(password, 10); //Password Hashing        
        const user = new User({ //Creating a new instance of "User" Model
            firstName,
            lastName,
            emailId,
            password: passwordHashed,
            age,
            gender,
            photoUrl,
            about,
            skills
        });
        await user.save(); //Saving document into the database
        res.status(200).send("User data saved successfully");
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

//Get all users
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    }
    catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

//Find user by emailId 
app.get("/user", async (req, res) => {
    try {
        const user = await User.find({ emailId: req.body.emailId })
        if (user.length == 0) return res.status(404).send("User not found");
        res.status(200).send(user);
    }
    catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

//Delete user by emailId
app.delete("/user", async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ emailId: req.body.emailId });
        if (!deletedUser) return res.status(404).send("User not found")
        res.status(200).send("User Deleted Successfully");
    }
    catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

//Update the user details
app.patch("/user", async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { emailId: req.body.emailId },
            { $set: req.body },
        );
        if (!updatedUser) return res.status(404).send("User not found");
        res.status(200).send("User Updated Successfully");
    } catch (error) {
        res.status(500).send("Error: " + err.message);
    }
});

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