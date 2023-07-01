const mongoose = require("mongoose");
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
    email:{type:String,required:true},
    password: {type: String, required: true, minLen: 8, maxLen: 15, trim:true},
})
userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10).then((encryptedPassword) => {
        this.password = encryptedPassword;
        next();
    }).catch((error) => {
        throw error;
    });
});

module.exports = mongoose.model("User",userSchema)