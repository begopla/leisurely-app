const router = require("express").Router();

const async = require("hbs/lib/async");
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

router.use('/a', require('./activity.routes'));


module.exports = router;
