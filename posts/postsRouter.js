const express = require("express");

const Posts = require('../data/db');

const router = express.Router();

router.get("/", (req, res) => {
    Posts
        .find()
        .then(posts => {
            res.status(200).json({ posts });
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});

module.exports = router;