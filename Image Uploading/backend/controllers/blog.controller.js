const Blog = require('../models/blog.model')
const path = require('path')
const fs = require('fs')

exports.createBlog = async (req, res) => {
    const { title, description } = req.body
    const images = req.files.map((ele) => ele.filename)
    const blog = await Blog.create({ ...{ title, description }, image: images })
    res.send(blog)
}

exports.getBlogs = async (req, res) => {
    const blogs = await Blog.find()
    if (blogs.length > 0) {
        res.json({
            Success: true,
            blogs
        })
    }
}

exports.trashBlog = async (req, res) => {
    const { id } = req.params
    const matchBlog = await Blog.findById(id)
    if (matchBlog) {
        matchBlog.image.forEach((ele) => {
            let imagePath = path.join(__dirname, '../uploads', ele)
            fs.unlink(imagePath, async (err) => {
                if (err) {
                    res.json({
                        Success: false,
                        message: "File Path Not Found"
                    })
                } else {
                    await Blog.findByIdAndDelete(id)
                    res.json({
                        Success: true,
                        message: "Blog Has Been Deleted"
                    })
                }
            })
        })
    } else {
        res.json({
            Success: false,
            message: "Blog Not Found"
        })
    }
}

exports.updateBlog = async (req, res) => {
    const { id } = req.query
    const { title, description } = req.body
    const images = req.files.map((ele) => ele.filename)
    await Blog.findByIdAndUpdate(id, { title, description, ...{ image: images } })
    res.json({
        Success: true,
        message: "Blog Updated!"
    })
}
