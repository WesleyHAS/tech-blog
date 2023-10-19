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

// Get single post with comments
router.get("/:id", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    const postWithComments = await Blogpost.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: User,
        },
      ],
    });

    const post = postWithComments.toJSON(); // Convert to plain JSON object
    // const user = userData.get({ plain: true });

    res.render("single-post", {
      ...userData.toJSON(), // Convert user data to plain JSON object
      logged_in: true,
      loggedInUser: req.session.user_id,
      post: post, // Return single post object
    });

    // console.log(req.session.user_id);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post
router.post("/create-newpost", withAuth, async (req, res) => {
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

// Get the page to update the posts
router.get("/edit-post/:id", withAuth, async (req, res) => {
  try {
    // Retrieve the blog post with the given ID from your database
    const post = await Blogpost.findByPk(req.params.id);

    if (!post) {
      res.status(404).json({ message: "No post with this ID!" });
      return;
    }

    const postData = post.get({ plain: true });

    // Render the edit-post.handlebars page and pass the post data to it
    res.render("edit-post", {
      logged_in: true,
      postData,
    });
    // console.log(postData.id);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Updates the posts
router.put("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Blogpost.findByPk(req.params.id);

    if (!postData) {
      res.status(404).json({ message: "No post with this id!" });
      return;
    }

    // Update the content of the post
    postData.content = req.body.content;
    await postData.save(); // Save the changes

    res.redirect(`/${postData.id}`);
    // console.log(postData.id);
    // res.status(200).json({ message: "Post updated successfully" });
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
