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

//Get all users
app.get("/feed", async (req,res) => {
    try{
        const users = await User.find({});
        res.status(200).send(users);
    }
    catch(err){
        res.status(500).send("Oops!! Something Went Wrong");
    }
});

//Find user by emailId 
app.get("/user", async (req,res) => {
    try{
        const user = await User.find({ emailId: req.body.emailId})
        if(user.length == 0) return res.status(404).send("User not found");
        res.status(200).send(user);
    }
    catch(err){
        res.status(500).send("Oops!! Something Went Wrong");
    }
});

//Delete user by _id
app.delete("/delete", async (req,res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.body._id);
        if(!deletedUser) {
            res.status(404).send("User not found")
        }
         res.status(200).send("User Deleted Successfully"); 
    }
    catch(err){
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