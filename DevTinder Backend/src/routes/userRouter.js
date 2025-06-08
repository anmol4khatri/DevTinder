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
        .populate("fromUserId", "firstName lastName photoUrl age gender about skills")
        .populate("toUserId", "firstName lastName photoUrl age gender about skills");
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
        .populate("fromUserId", "firstName lastName photoUrl age gender about skills");
        if(!requests || requests.length === 0) throw new Error("No requests yet");

        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({error: "Error: " + err.message})
    }
});

// Get all users (Feed API)
userRouter.get("/user/feed", userAuth, async (req, res) => {
    try {
        // Find connection requests that are initiated from any of the ends
        const connectionRequestsFromAnyEnds = await ConnectionRequest.find({
            $or: [
                {fromUserId: req.user._id},
                {toUserId: req.user._id}
            ]
        })
        .select("fromUserId toUserId");

        //Set is a data structure which stores only unique elements/values
        const hideUsers = new Set();
        // Add users that came from "connectionRequestFromAnyEnds" to "hidUsers"
        connectionRequestsFromAnyEnds.forEach(element => {
            hideUsers.add(element.fromUserId.toString());
            hideUsers.add(element.toUserId.toString());
        });

        //Final feed that will be shown to the user
        const users = await User.find({
            $and: [
                //Query: Show all users except these
                {_id: {$nin: Array.from(hideUsers)}}, //not in array "hideUsers"
                {_id: {$ne: req.user._id}} //not equals to "self"
            ]
        })
        .select("firstName lastName photoUrl age gender about skills");

        res.status(200).json({data: users});
    }
    catch (err) {
        res.status(500).json({error: "Error: " + err.message})
    }
});

module.exports = userRouter;