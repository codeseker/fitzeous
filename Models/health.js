const mongoose = require("mongoose");

const HealthBlogSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    comment: [
        {
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model("HealthBlog", HealthBlogSchema);