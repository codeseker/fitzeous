const healthBlog = require("../Models/health");
const fs = require("fs");

const getSingleBlog = async (req, res) => {
    const _id = req.query.id;
    const userBlogId = {
        id: _id
    };
    req.body = userBlogId;
    const result = await healthBlog.find({ _id });

    res.status(200).send(result);
}

const searchBytag = async (req, res) => {
    const { tag } = req.body;
    const result = await healthBlog.find({ tag });
    res.status(200).json(result);
}


module.exports = {
    searchBytag,
    getSingleBlog
}