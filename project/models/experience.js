const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        // lowercase: true,
    },
    branch: {
        type: String,
        require: true,
        // lowercase: true,
    },
    exp: {
        type: String,
        require: true,
        // lowercase: true,
    },
    year: {
        type: String,
        require: true,
        // lowercase: true,
    },
    company:
    [{ type: mongoose.Schema.Types.ObjectId, ref: 'company' }],

    approved:
    {
        type: Boolean,
        default: false,
    },

    img:
    {
        data: Buffer,
        contentType: String
    }
})

const experience = mongoose.model('experience', experienceSchema);
module.exports = experience;