const router = require("express").Router();

const { isLoggedIn } = require("../middlewares/auth.middlewares");
const { isLoggedOut } = require("../middlewares/auth.middlewares");
const Activity = require("../models/Activity.model");

//Load activity details
//This router is prefixed with /a

//Create an activity (get/post)

router.get("/create",isLoggedIn, (req, res, next) => {
  try {
    res.render("activities/new-activity");
  } catch (error) {
    next(error);
  }
});

router.post("/create",isLoggedIn, async (req, res, next) => {
  try {
      const user = req.session.currentUser;
      const currentUser = user._id;
      console.log(currentUser)
      const { name, description, imageUrl, startDate, endDate, location, price, organizer}=req.body;
      const newActivity = await Activity.create({ name, description, imageUrl, startDate, endDate, location, price, organizer, user});
      res.redirect("/profile");
  } catch (error) {
      next(error)
  }
});

//Edit activitites

router.get("/:id/edit")


//See activity details

router.get("/", async (req, res, next) => {
  try {
    const activities = await Activity.find();
    //TODO create and activities view when logged in.
    // res.render("activities",{activities});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
