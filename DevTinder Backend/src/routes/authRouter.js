const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validate");

const authRouter = express.Router();

//Signup a new user
authRouter.post("/signup", async (req, res) => {
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
authRouter.post("/login", async (req, res) => {
    const { emailId, password } = req.body;
    
    try{
        if(!validator.isEmail(emailId)) throw new Error("Enter a valid email id");//Validation
        
        const user = await User.findOne({emailId}); //Checking weather the user with this email actually exists
        if(!user) throw new Error("Invalid Credentials");
        const isPasswordValid = await user.validatePassword(password); //user schema method function
        if(isPasswordValid) {
            //Creating JWT Token
            const token = await user.getJWT(); //user schema method function
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

module.exports = authRouter;