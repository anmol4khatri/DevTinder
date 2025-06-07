const express = require("express");
const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");

const connectionRequestRouter = express.Router();

connectionRequestRouter.post("/request/send/:status/:userId", userAuth,  async (req, res) => {
    
    const fromUserId = req.user._id; //comes from userAuth middleware
    const toUserId = req.params.userId;
    const status = req.params.status;
    const allowedStatus = ["ignored", "intrested"];

    try {
        //Checking :status type
        if(!allowedStatus.includes(status)) throw new Error("Invalid status type: " + status);

        //Ensuring if the :userID ("toUserID") truely exits
        const toUser = await User.findById(toUserId);
        if(!toUser) throw new Error("User not found");

        //Checking if the connection request already exists
        const existingRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId: fromUserId, toUserId: toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        });
        console.log("Existing Request:", existingRequest);
        if(existingRequest) throw new Error("Connection request already exists !!");

        //All checks passed, now creating "New instance of connectionRequest model"
        const newRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });
        const data = await newRequest.save();

        res.status(200).json({message: "Connection Request Sent Successfully"});

    } catch (err) {
        res.status(500).json({error: "Error: "  + err.message});
    }
});

module.exports = connectionRequestRouter;