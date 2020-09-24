const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
// @route  GET /dashboard
// @desc   display user info
// @access Private
router.get("/", auth, (req, res) => {
  res.send(
    `Hello, ${req.user.username}! You've passed authentication and is looking at the dashboard`
  );
});

module.exports = router;
