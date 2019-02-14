const express = require("express");

const Posts = require("../data/db");

const router = express.Router();

router.get("/", (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json({ posts });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Posts.findById(id)
    .then(post => {
      if (post.length !== 0) {
        return res.status(200).json({ post });
      } else {
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  const post = { title, contents };

  if (!title || !contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }

  Posts.insert(post)
    .then(newId => {
      const { id } = newId;

      Posts.findById(id).then(post => {
        res.status(201).send(post);
      });
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the post to the database."
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Posts.findById(id)
    .then(post => {
      if (post.length !== 0) {
        Posts.remove(id)
          .then(deletedPost => {
            res.status(200).json({ post });
          })
          .catch(err => {
            res.status(500).json({ error: "The post could not be removed." });
          });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;

  const { title, contents } = req.body;
  const updatedPost = { title, contents };

  if (!title || !contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }

  Posts.findById(id)
    .then(post => {
      if (post.length !== 0) {
        return Posts.update(id, updatedPost)
          .then(post => {
            Posts.findById(id).then(post => {
              res.status(200).json({ updatedPost });
            });
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: "The post information could not be modified." });
          });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

module.exports = router;
