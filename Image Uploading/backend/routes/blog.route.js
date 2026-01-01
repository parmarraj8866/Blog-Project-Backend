const router = require('express').Router()
const controller = require('../controllers/blog.controller')
const { VerifyAuth } = require('../Middleware/Varify.middle')
const upload = require("../utils/upload")


router.route("/").post(upload.array("image", 3), VerifyAuth, controller.createBlog)
    .get(VerifyAuth, controller.getBlogs)
    .put(upload.array("image", 3), VerifyAuth, controller.updateBlog)

router.route("/:id").delete(controller.trashBlog)

module.exports = router