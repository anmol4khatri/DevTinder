const express = require("express");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");

const userRouter = express.Router();

// See all connections
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const connections = await ConnectionRequest.find({
            $or:[
                {toUserId: req.user._id, status: "accepted"},
                {fromUserId: req.user._id, status: "accepted"}
            ]
        })
        .populate("fromUserId", "firstName lastName photoUrl age gender")
        .populate("toUserId", "firstName lastName photoUrl age gender");
        if(!connections || connections.length === 0) throw new Error("No connections yet");

        const data = connections.map((row) => {
            if(row.fromUserId._id.toString() === req.user._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({error: "Error: " + err.message})
    }
});

// Pending connection request
userRouter.get("/user/requests", userAuth, async (req, res) => {
    try {
        const requests = await ConnectionRequest.find({
            toUserId: req.user._id,
            status: "intrested",
        })
        .populate("fromUserId", "firstName lastName photoUrl age gender");
        if(!requests || requests.length === 0) throw new Error("No requests yet");

        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({error: "Error: " + err.message})
    }
});

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