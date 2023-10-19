const router = require("express").Router();
const { User } = require("../../models");

// SIGN-UP Route
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({
        user: userData,
        message: "You are now registered and logged in!",
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      // User not found, send an error response
      return res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      // Password is incorrect, send an error response
      return res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// LOGOUT Route
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
