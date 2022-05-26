const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const auth = require("./auth.routes");
router.use("/auth", auth);

module.exports = router;
