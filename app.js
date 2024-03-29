require("dotenv").config();

const express = require("express");
const healthRouter = require("./Routes/health");
const app = express();
const connectDB = require("./db/db");
const CommentRoute = require("./Routes/comment");
const authRouter = require("./Routes/auth");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/health/", healthRouter);
app.use("/api/v1/health/",CommentRoute);


const port = 8000;
const hostname = '0.0.0.0';

const start = async () => {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, hostname, () => {
        console.log("Connected");
    })
}

start();