const router = require('express').Router()
const userPassController = require('../controllers/userpassword.controller')
const { VerifyAuth } = require('../Middleware/Varify.middle')

router.route("/signup").post(userPassController.signup)
router.post("/login", userPassController.login)
router.get("/checkauth", userPassController.checkAuth)
router.post("/changePass", VerifyAuth, userPassController.changePassword)
router.post("/sendOtp", VerifyAuth, userPassController.sendOtp)
router.post("/updatePassword", userPassController.updatePassword)

module.exports = router