import User from "../model/userModel.js";
import catchAsyncErr from "../middlewares/catchAsyncErr.js";
import ErrorHandler from "../middlewares/ErrorHandler.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto"
import cloudinary from "cloudinary"
import {OAuth2Client}from 'google-auth-library';
import mailgun from "mailgun-js";
const DOMAIN = 'sandboxc415a02114654f71bf53e6871f61bc0e.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});
const client = new OAuth2Client("14928484089-aq5ckopm9jf0eu8ricjapu1nin9fdami.apps.googleusercontent.com")

// register user
export const registerUser = catchAsyncErr(async (req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatar',
        with: 150,
        crop: "scale",
    })

    const { name, email, password } = req.body
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    })

    sendToken(user, 201, res)
})
// login user
export const loginUser = catchAsyncErr(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new ErrorHandler('plz enter email and password', 400))
    }

    const user = await User.findOne({email}).select('+password')
    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    const isPass = await user.comparePassword(password)
    if (!isPass) {
        return next(new ErrorHandler('Invalid password', 401))
    }

    sendToken(user, 200, res)
})
// login with google
export const googleLogin = catchAsyncErr(async (req, res, next) => {
    const {tokenId} = req.body
    
    client.verifyIdToken({
        idToken: tokenId, 
        audience: "14928484089-aq5ckopm9jf0eu8ricjapu1nin9fdami.apps.googleusercontent.com"
    }).then(response => {
        const {email_verified, name, email, picture} = response.payload
        if (email_verified) {
            User.findOne({email}).exec(async (err, user) => {
                if (err) {
                    return next(new ErrorHandler('Something went wronge...', 400))
                } else {
                    if (user) {
                        console.log("555");
                        sendToken(user, 200, res)
                    } else {
                        console.log("444");
                        const myCloud = await cloudinary.v2.uploader.upload(picture, {
                            folder: 'avatar',
                            with: 150,
                            crop: "scale",
                        })
                        let password = email
                        let newUser = new User({
                            name,
                            email,
                            password,
                            avatar: {
                                public_id: myCloud.public_id,
                                url: myCloud.secure_url
                            }
                        });
                        newUser.save()
                        console.log(newUser);
                        sendToken(newUser, 201, res)
                    }
                }
            })
        }
    })
})
// logout user
export const logoutUser = catchAsyncErr(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: 'user logged out successfilly'
    })
})
// forgot password
export const forgotPassword = catchAsyncErr(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404))
    }

    const resetToken = user.getResetPasswordToken()
    await user.save({ validateBeforeSave: false })
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is as follow:<br><br>(<a href='${resetUrl}'>${resetUrl}</a>)<br><br>If you have not requested this email, then ignore it`;

    const data = {
        from: 'Tsouq <reactweed@gmail.com>',
        to: user.email,
        subject: 'Tsouq password recovery',
        html: message
    };

    try {
        mg.messages().send(data, function (error, body) {
            console.log(body);
        });

        res.status(200).json({
            success: true,
            message: `Email send to: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message, 500))
    }
})
// forgot password
// export const forgotPassword = catchAsyncErr(async (req, res, next) => {
//     const user = await User.findOne({ email: req.body.email })
//     if (!user) {
//         return next(new ErrorHandler('User not found with this email', 404))
//     }

//     const resetToken = user.getResetPasswordToken()
//     await user.save({ validateBeforeSave: false })

//     const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

//     const message = `Your password reset token is as follow:\n\n(${resetUrl})\n\nIf you have not requested this email, then ignore it`;

//     try {
//         await sendEmail(({
//             email: user.email,
//             subject: 'Tsouq password recovery',
//             message
//         }))

//         res.status(200).json({
//             success: true,
//             message: `Email send to: ${user.email}`
//         })
//     } catch (error) {
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpire = undefined;

//         await user.save({ validateBeforeSave: false })

//         return next(new ErrorHandler(error.message, 500))
//     }
// })

// reset password
export const resetPassword = catchAsyncErr(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('password reset token is invalid or expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('password not match', 400))
    }
    user.password = req.body.password
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save()

    sendToken(user, 200, res)


})
// user profile
export const userProfile = catchAsyncErr(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})
// change password
export const userChangePassword = catchAsyncErr(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    const isPass = await user.comparePassword(req.body.oldPassword)
    if (!isPass) {
        return next(new ErrorHandler('old password is incorrect', 400));
    }

    user.password = req.body.newPassword
    await user.save()
    sendToken(user, 200, res)

})
// update profile
export const userUpdateProfile = catchAsyncErr(async (req, res, next) => {
    const user = {
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        address: req.body.address,
    }

    if (req.body.avatar !== '') {
        const us = await User.findById(req.user.id)
        const imgId = us.avatar.public_id

        await cloudinary.v2.uploader.destroy(imgId)
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatar',
            with: 150,
            crop: "scale",
        })
        user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }

    const newUser = await User.findByIdAndUpdate(req.user.id, user, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        newUser
    })
})
// admin get all users
export const adminGetAllUsers = catchAsyncErr(async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        users
    })
})
// admin get one user
export const adminGetOneUser = catchAsyncErr(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorHandler('user not found with this id', 401))
    }

    res.status(200).json({
        success: true,
        user
    })
})
// admin update user
export const adminUpdateUser = catchAsyncErr(async (req, res, next) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const newUser = await User.findByIdAndUpdate(req.user.id, user, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        newUser
    })
})
// admin delete user
export const adminDeleteUser = catchAsyncErr(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorHandler('user not found with this id', 400))
    }

    await user.remove()

    res.status(200).json({
        success: true,
        message: 'User deleted successfully'
    })
})