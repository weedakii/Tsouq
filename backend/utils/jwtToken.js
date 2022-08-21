const sendToken = (user, statusCode, res) => {
    const token = user.jsonWebToken()

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite : "none",
        secure: true,
    }
    res.cookie('tsouq_token', token, options)
    res.status(statusCode).json({
        success: true,
    })
}

export default sendToken