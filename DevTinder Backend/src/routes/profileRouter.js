const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");

const profileRouter = express.Router();

//User Profile
profileRouter.get("/profile/view", userAuth, (req,res) => {
    try{
        const user = req.user;//comes form userAuth middleware
        res.status(200).send(user);
    } catch(err){
        res.status(500).send("Error: " + err.message);
    }
});

//Update the profile details
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user; //comes from userAuth middleware
        const editAllowedFields = ["firstName", "lastName", "emailId", "photoUrl", "about", "skills"];

        Object.keys(req.body).forEach((key) => {
            if(editAllowedFields.includes(key)) {
                loggedInUser[key] = req.body[key];
            }
        });
        await loggedInUser.save();
        res.status(200).send("User Updated Successfully");
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

module.exports = profileRouter;