const express = require("express");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");

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
    
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const user = req.user; // comes from userAuth middleware

    try {
        // Checks if any of those three field is left empty
        if(!currentPassword || !newPassword || !confirmNewPassword){
            return res.status(400).json({error: "All fields are required"});
        };
        // Checks if "newPassword" exactly matches with "confirmPassword"
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({error: "Confirm Password should be same as New Password"});
        };
        // Validates if the "newPassword" is strong enough
        if(!validator.isStrongPassword(newPassword)){
            return res.status(400).json({error: "Choose a strong password"});
        };

        const isMatch = await bcrypt.compare(currentPassword, user.password);;
        if(!isMatch){
            return res.status(400).json({error: "Current Password Entered Is Incorrect"});
        }

        //Hashing & Updating New Password
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        //Generating new JWT Token and overwriting the cookies with new Token
        const newToken = user.getJWT();  //user schema method function
        res.cookie("token", newToken);

        res.status(200).json({message: "Password updated successfully"});


    } catch (err) {
        res.status(500).json({error: "Internal Server Error: " + err.message});
    }
});

module.exports = profileRouter;