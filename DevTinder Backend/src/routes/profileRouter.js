const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");

const profileRouter = express.Router();

//User Profile
profileRouter.get("/profile/view", userAuth, (req, res) => {
    try {
        const user = req.user;//comes form userAuth middleware
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

//Update the profile details(with restriction)
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user; //comes from userAuth middleware
        const editAllowedFields = ["firstName", "lastName", "emailId", "photoUrl", "about", "skills"];

        Object.keys(req.body).forEach((key) => {
            if (editAllowedFields.includes(key)) {
                loggedInUser[key] = req.body[key];
            }
        });
        await loggedInUser.save();
        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfuly`,
            data: loggedInUser,
        });
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

//Password Change
profileRouter.patch("/profile/changePassword", userAuth, async (req, res) => {
    // TODO: 
    // input(res.body) ==> currentPassword, New Password, Coinform Password
    // none of the field shoud be empty
    // new password should exactly match coinform password
    // password data validation
    // bcrypt comapre ==> currentPAssword & newPassword
    // throw error if not
    // if true, hash new passowrd and store it to the DB
    // generate a new jwt token
    // overwrite the cookie to store new token
});

module.exports = profileRouter;