const router = require("express").Router();

const Activity = require("../models/Activity.model");

/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    const activities = await Activity.find();
  res.render("index",{ activities });
  } catch (error) {
    next(error);
  }
});

/* USE routes files */

const auth = require("./auth.routes");

router.use("/auth", auth);
router.use('/a', require('./activity.routes'));
router.use('/profile',require('./profile.routes'));

module.exports = router;
