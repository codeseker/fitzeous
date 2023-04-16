require("dotenv").config();
const jwt = require("jsonwebtoken");

const fetchuser = async(req, res, next)=>{
    const token = req.header("auth-token");
    if(!token){
        res.send("Please authenticate with valid token");
        return;
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
}

module.exports = fetchuser