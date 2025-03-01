const express = require("express");

const router = express();

router.get("/home", (req, res) => {
  res.render("home");
});

module.exports = router;
