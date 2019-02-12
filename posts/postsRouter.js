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

router.get("/:id", (req, res) => {
    const { id } = req.params;

    Posts
        .findById(id)
        .then(post => {
            if (post) {
                res.status(200).json({ post });
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
})

module.exports = router;