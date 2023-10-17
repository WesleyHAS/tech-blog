const router = require("express").Router();
const { Blogpost, User, Comment } = require("../models");

// Get all posts for the homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Blogpost.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get single post by ID, including its comments
router.get("/post/:id", async (req, res) => {
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

    const post = postData.get({ plain: true });

    res.render("single-post", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

// Render the sign-up page
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("signup");
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

module.exports = router;*/

/*const router = require("express").Router();
const { Blogpost, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Get all posts for the homepage
router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blogpost.findAll({
      include: [User],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const blogData = await Blogpost.findByPk(req.params.id, {
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

    const blogs = blogData.get({ plain: true });

    res.render("single-post", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

// Render the sign-up page
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("signup");
});

module.exports = router;
*/
