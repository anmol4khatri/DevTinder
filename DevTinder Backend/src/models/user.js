const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address: ")
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error ("Enter a Strong Password")
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value){
        if(!validator.isURL(value)){
            throw new Error ("Invalid URL");
        }
      }
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
    },
    skills: {
      type: [String],
    },
},
{
    timestamps: true,
});

userSchema.methods.getJWT = function () {
    const user = this; //points to the current instence of user model
    
    //Creating a JWT Token
    const token = jwt.sign({_id: user._id}, "DevTinder@key", {expiresIn: "7d"});
    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this; //points to the current instance of user model
    const passwordHashed = user.password; 

    //Compare user entered password with existing hashed password
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHashed);
    return isPasswordValid;
}

const User = mongoose.model("User", userSchema);
module.exports = User;