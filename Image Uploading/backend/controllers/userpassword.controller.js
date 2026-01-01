const { plainToHash, hashToPlain } = require("../utils/password")
const UserPassword = require("../models/userPassword.model")
const sendMailer = require("../Config/mailer")
const EmailSendUI = require("../EmailSendUI/emailsendUI")
const otpGenerator = require('otp-generator')

exports.signup = async (req, res) => {

    try {
        const { username, email, mobile, password } = req.body
        const hashPass = await plainToHash(password)
        const matchEmail = await UserPassword.findOne({ email })

        if (matchEmail) {
            return res.json({
                success: false,
                message: "Email Already Exist!"
            })
        }
        const userPassword = await UserPassword.create({ username, email, mobile, password: hashPass })

        res.json({
            success: true,
            message: "Signup SuccessFully!"
        })

    }
    catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    const ExistUser = await UserPassword.findOne({
        email
    })

    if (!ExistUser) {
        return res.json({
            success: false,
            message: "Email Id Not Exist!"
        })
    }

    const hashPass = ExistUser.password
    const matchPass = await hashToPlain(password, hashPass)

    if (!matchPass) {
        return res.json({
            success: false,
            message: "Password Not Match!"
        })
    }

    const payload = {
        id: ExistUser?._id,
        emailId: ExistUser?.email
    }

    req.session.user = {
        ...payload
    }

    res.json({
        success: true,
        message: "User SuccessFully Login!"
    })

}

exports.checkAuth = async (req, res) => {
    const token = req.session.user
    if (!token) {
        return res.json({
            success: false,
            user: null
        })
    }

    res.json({
        success: true,
        user: token
    })
}

exports.changePassword = async (req, res) => {
    const { id } = req.session.user
    const { curr_pass, new_pass } = req.body

    const matchUser = await UserPassword.findById(id)
    if (!matchUser) {
        return res.json({
            success: false,
            message: "User Not Found!"
        })
    }
    const matchPass = await hashToPlain(curr_pass, matchUser.password)

    if (!matchPass) {
        return res.json({
            success: false,
            message: "Current Password Not Match!"
        })
    }

    const hass_pass = await plainToHash(new_pass)

    const user = await UserPassword.findByIdAndUpdate(id,
        {
            password: hass_pass
        }
    )

    res.json({
        success: true,
        message: "Password Changed!"
    })
}


exports.sendOtp = async (req, res) => {
    const { email } = req.body
    const matchUser = await UserPassword.findOne({
        email
    })

    if (!matchUser) {
        return res.json({
            success: false,
            message: "User Not Found!"
        })
    }

    // otp generate 
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const user = await UserPassword.updateOne({ email }, { otp })

    await sendMailer(email, "Forgot Password", EmailSendUI(otp))

    res.json({
        success: true,
        message: "Send Mail!"
    })
}

exports.updatePassword = async (req, res) => {

    const { otp, new_pass } = req.body

    const matchUser = await UserPassword.findOne({ otp })

    if (!matchUser) {
        return res.json({
            success: false,
            message: "otp not match"
        })
    }

    const hash_pass = await plainToHash(new_pass)

    await UserPassword.findByIdAndUpdate(matchUser._id, { password: hash_pass, otp: "" })

    res.json({
        success: true,
        message: "Your Password Has Been Updated!"
    })
}