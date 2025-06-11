const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, emailId, password } = req.body ;
    if(!firstName){
        throw new Error("First name can't be empty");
    }
    else if(firstName.length < 2 || firstName.length > 50){
        throw new Error ("First name should be of 2-50 characters");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error ("Email is invalid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error ("Choose a strong password");
    }
};

module.exports = { validateSignUpData };