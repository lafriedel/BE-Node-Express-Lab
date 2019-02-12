const express = require("express");
const cors = require("cors");
const postsRouter = require("./posts/postsRouter");

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/posts", postsRouter)

server.get("/", (req,res) => {
    res.send("It's working");
});

module.exports = server;