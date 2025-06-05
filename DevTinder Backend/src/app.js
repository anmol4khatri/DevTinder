const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validate");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

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

//Login existing user
app.post("/login", async (req, res) => {
    const { emailId, password } = req.body;
    
    try{
        if(!validator.isEmail(emailId)) throw new Error("Enter a valid email id");//Validation
        
        const user = await User.findOne({emailId}); //Checking weather the user with this email actually exists
        if(!user) throw new Error("Invalid Credentials");
        const isPasswordValid = await bcrypt.compare(password, user.password); //Compare user entered password with existing hashed password
        if(isPasswordValid) {
            //Creating JWT Token
            const token = jwt.sign({_id: user._id}, "DevTinder@key");
            if (!token) throw new Error("Something went wrong while creating JWT token");
            res.cookie("token", token);

            res.status(200).send("Login Successful");
        }
        else{
            throw new Error("Invalid Credentials");
        }

    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

//User Profile
app.get("/profile", (req,res) => {
    //check and verify the JWT token from the browser cookies
    const token = req.cookies.token;

    try{
        //redirect to login page if cookies does not exists
        if(!token) return res.redirect("/login");

        //allow user to to interect with the server only if the JWT verification gets successful
        const decoded = jwt.verify(token, "DevTinder@key");
        res.status(200).send(decoded);
    } catch(err){
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
        if (user.length == 0) throw new Error("User not found");
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
        if (!deletedUser) throw new Error("User not found")
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
        if (!updatedUser) throw new Error("User not found");
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