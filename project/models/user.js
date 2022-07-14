const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const userSchema = new mongoose.Schema({
    // username :  {
    //     type: String,
    //     require: true,
    //     unique: true,
    //     lowercase: true,
    //     // validate: [isEmail, 'Please enter a valid email'],
    // },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        require: [true],
        minlength: [8, 'Minimum password length is 8 characters'],
    },
    // admin: { type: String, enum: ['admin', 'restricted'], default: true },
})

// encryption
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//login check
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

//create and export
const User = mongoose.model('user', userSchema);
module.exports = User;