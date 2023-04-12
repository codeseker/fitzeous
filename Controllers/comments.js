const healthBlog = require("../Models/health");

const addComment = async (req, res) => {
    const _id = req.query.id;
    const comment = req.body;

    const result = await healthBlog.updateMany(
        { _id },
        { $push: { comment: comment } }
    )
    res.status(200).json(result);
}

const getComment = async (req, res) => {
    const _id = req.query.id;

    const comments = await healthBlog.find({ _id }, {
        comment: 1
    });

    res.json(comments);
}

module.exports = {
    addComment, getComment
}