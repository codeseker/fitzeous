require("dotenv").config();

const express = require("express");
const healthRouter = require("./Routes/health");
const app = express();
const connectDB = require("./db/db");
const CommentRoute = require("./Routes/comment");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/v1/health/", healthRouter);
app.use("/api/v1/health/", CommentRoute);

const port = 80;
const hostname = '192.168.250.20';

const start = async () => {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, hostname, () => {
        console.log("Connected");
    })
}

start();