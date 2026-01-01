
exports.VerifyAuth = async (req, res, next) => {
    const user = req.session.user
    if (!user) {
        return res.json({
            success: false,
            message: "You are not Authorize!"
        })
    }
    next()
}