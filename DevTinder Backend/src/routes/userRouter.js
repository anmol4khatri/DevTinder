const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();

//Get all users
userRouter.get("/user/feed", userAuth, async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    }
    catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

module.exports = userRouter;