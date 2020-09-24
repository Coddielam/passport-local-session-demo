const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// @route    GET /api/user/register
// @desc     register page
// @access   Public
router.get("/register", (req, res) => {
  res.send("You in register page");
});

// @route    POST /api/user/register
// @desc     register user
// @access   Public
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // check email
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "Email already registered" });

    // create user document(object)
    user = new User({
      username,
      email,
      password,
    });

    // hash password
    user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.redirect("/api/user/login");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// ################################################################################

// @route    GET /api/user/login
// @desc     login page
// @access   Public
router.get("/login", (req, res) => {
  res.send("You in login page");
});

// @route    GET /api/user/logout
// @desc     logout page
// @access   Public
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/api/user/login");
});

// @route    POST /api/user/login
// @desc     Logging in a user
// @access   Public
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/api/user/login",
    successRedirect: "/dashboard",
  })
);

module.exports = router;
