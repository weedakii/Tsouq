import catchAsyncErr from "../middlewares/catchAsyncErr.js"
import jwt from 'jsonwebtoken'
import ErrorHandler from "../middlewares/ErrorHandler.js"
import User from "../model/userModel.js"

export const isAuthenticated = catchAsyncErr(async (req, res, next) => {
    const { tsouq_token } = req.cookies
    if (!tsouq_token) {
        return next(new ErrorHandler('plz login first to access this page',401))
    }
    const decoded = jwt.verify(tsouq_token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)

    next()

})
export const authRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed`, 403))
        }
        next()
    }
}