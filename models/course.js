const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    details: {
        type: String,
        trim: true,
        minlength: 2,
    },
    semester: {
        type: String,
        trim: true,
    },
    enrollstatus: {
        type: String,
        required: true,
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, { timestamps: true });

const Course = mongoose.model("course", courseSchema);
module.exports = { Course };
