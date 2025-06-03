const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://anmolkhatri04:Sg3KzHRPndKvqX4h@cluster0.vem67ho.mongodb.net/DevTinder");
};

module.exports = connectDB;