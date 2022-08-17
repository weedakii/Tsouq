const sendToken = (user, statusCode, res) => {
    const token = user.jsonWebToken()

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
        ),
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
    })
}

export default sendToken