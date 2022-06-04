const router = require("express").Router();

const Activity = require("../models/Activity.model");
const { isLoggedOut } = require("../middlewares/auth.middlewares");

/* GET home page */
router.get("/",isLoggedOut, async (req, res, next) => {
  try {
    const activities = await Activity.find();
    res.render("index", { activities });
  } catch (error) {
    next(error);
  }
});

/* USE routes files */

const auth = require("./auth.routes");

router.use("/auth", auth);
router.use("/a", require("./activity.routes"));
router.use("/a", require("./comments.routes"));
router.use("/profile", require("./profile.routes"));
router.use("/settings", require("./settings.routes"));

module.exports = router;
