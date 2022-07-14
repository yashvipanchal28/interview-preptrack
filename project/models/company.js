const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        // lowercase: true,
    },
    url:{
        type:String,
        require:true,
    }
})

const company = mongoose.model('company', companySchema);
module.exports = company;