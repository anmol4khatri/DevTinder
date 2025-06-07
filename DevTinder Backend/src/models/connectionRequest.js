const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status : {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "intrested", "accepted", "rejected"],
            message: "Incorrect Status Type"
        }
    }
},
    {
        timestamps: true
    }
);

//Compound indxing
connectionRequestSchema.index({fromUserId: 1, toUserId: 1});

//pre hook, ensures "fromUserId !== toUserId" before saving data to db document
connectionRequestSchema.pre("save", function (next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Can't send connection request to yourself");
    }
    next();
});

const ConnectionRequest = new mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = ConnectionRequest;