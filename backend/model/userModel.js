import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'plz enter product name'],
        maxlength: [30, 'your name can be more than 30 characters']
    },
    lastName: {
        type: String,
        maxlength: [30, 'your name can be more than 30 characters']
    },
    phoneNo: {
        type: Number,
        maxlength: [11, 'your name can be more than 30 characters']
    },
    address: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'plz enter product email'],
        unique: true,
        validate: [validator.isEmail, 'this email is already used plz enter a valide email']
    },
    password: {
        type: String,
        required: [true, 'plz enter product password'],
        minlength: [6, 'your password must be at least 6 characters'],
        maxlength: 20,
        select: false
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAT: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})
// encrypt password before saving
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})
// compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
// json web token
userSchema.methods.jsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION
    })
}
// generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex')

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken
}

export default mongoose.model('User', userSchema)