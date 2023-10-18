const router = require("express").Router();
const { Blogpost, User } = require("../models");
const withAuth = require("../utils/auth");

// Get all posts by logged-in user
router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    const postData = await Blogpost.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [User],
      raw: true,
      nest: true,
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
      posts: postData,
    });
    console.log(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the form to add a new post
router.get("/new", withAuth, (req, res) => {
  res.render("add-post", {
    logged_in: req.session.logged_in,
  });
});

// Get a single post to edit
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Blogpost.findByPk(req.params.id);

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    const post = postData.get({ plain: true });

    res.render("edit-post", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

/*const router = require("express").Router();
const { User, Blogpost, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Home route
router.get("/", async (req, res) => {
  try {
    // Fetch blog posts from the database
    const blogposts = await Blogpost.findAll({
      include: [{ model: User, attributes: ["username"] }],
      order: [["created_at", "DESC"]],
    });

    // Render the homepage with blog posts
    res.render("homepage", {
      blogposts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Display a single blog post
router.get("/blogpost/:id", async (req, res) => {
  try {
    const blogpostData = await Blogpost.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        { model: Comment, include: { model: User, attributes: ["username"] } },
      ],
    });

    if (!blogpostData) {
      res.status(404).json({ message: "No blog post found with this id" });
      return;
    }

    const blogpost = blogpostData.get();

    // Render the single blog post page
    res.render("single-blogpost", {
      blogpost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
*/
