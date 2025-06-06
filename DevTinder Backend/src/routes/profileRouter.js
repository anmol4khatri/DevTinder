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
        const user = req.user;//comes form userAuth middleware
        const updatedUser = await User.findByIdAndUpdate(
            { _id: req.user._id },
            { $set: req.body },
        );
        if (!updatedUser) throw new Error("User not found");
        res.status(200).send("User Updated Successfully");
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

module.exports = profileRouter;