require("dotenv").config();

const connectDB = require("./db/db");
const healthBlog = require("./Models/health");
const blogs = require("./Mock Data/health.json");

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await healthBlog.deleteMany();
        await healthBlog.create(blogs);
        console.log("Success");
        process.exit(0);
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

start();