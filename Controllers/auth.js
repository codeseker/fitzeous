require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");


const createUser = async(req, res)=>{
    const {email, username, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    const user = await User.create({
        username: username,
        email: email,
        password: secPass
    })
    const data = {
        user: {
            id: user._id
        }
    }

    const token = await jwt.sign(data, process.env.JWT_SECRET);
    res.json({token, success: "true"});
    
}

const login = async(req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    const data = {
        user: {
            id: user._id
        }
    }
    let success = false;

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
        success = false;
        res.status(400).send({success, error: "Please provide proper credentials"});
    }

    success = true;
    
    const token = await jwt.sign(data, process.env.JWT_SECRET);
    res.json({token, success});

}

const getUser = async (req, res)=>{
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
}

module.exports = {
    createUser,
    login,
    getUser
}