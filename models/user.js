const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim:true,
    },
    email: {
        type: String,
        trim:true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    googleId: { 
        type: String,
        unique: true,
      },
}, { timestamps: true });

const User = mongoose.model("user", userSchema);
module.exports = {User};