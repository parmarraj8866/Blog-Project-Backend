const { Schema, model } = require("mongoose")
const common = require("./common.model")

const blogSchema = new Schema({
    title: { ...common },

    description: { ...common },


    image: {
        type: [String],
        require: false
    }
}, {
    timestamps: true
})

module.exports = model("blog", blogSchema)

