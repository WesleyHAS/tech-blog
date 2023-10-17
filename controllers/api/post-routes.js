const router = require("express").Router();
const { Blogpost, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Blogpost.findAll({
      include: [User],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single post by ID
router.get("/:id", async (req, res) => {
  try {
    const postData = await Blogpost.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Blogpost.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a post by its `id` value
router.put("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Blogpost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Blogpost.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

/*const router = require("express").Router();
const { Blogpost } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to create a new blog post
router.post("/", withAuth, async (req, res) => {
  try {
    const newBlogpost = await Blogpost.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogpost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to update an existing blog post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedBlogpost = await Blogpost.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!updatedBlogpost[0]) {
      res.status(404).json({
        message: "No blog post found with this id or you are not the owner.",
      });
      return;
    }

    res.status(200).json({ message: "Blog post updated successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to delete a blog post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletedBlogpost = await Blogpost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletedBlogpost) {
      res.status(404).json({
        message: "No blog post found with this id or you are not the owner.",
      });
      return;
    }

    res.status(200).json({ message: "Blog post deleted successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
*/
