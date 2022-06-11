const router = require("express").Router();
/* const async = require("hbs/lib/async"); */
const { isLoggedIn } = require("../middlewares/auth.middlewares.js");
const Activity = require("../models/Activity.model");
const User = require("../models/User.model");
//This router is prefixed with /profile

//Load saved activities(get)

router.get("/savedactivities", isLoggedIn, async (req, res, next) => {
  try {
    const currentUser = req.session.currentUser;
    const currentUserId = currentUser._id;

    const user = await User.findById(currentUserId).populate("bookmarkList");
    const savedActivities = user.bookmarkList;
    res.render("profile/saved-activities", { savedActivities });
  } catch (error) {
    next(error);
  }
});
//Load registered activities(get)

router.get("/going", isLoggedIn, async (req, res, next) => {
  try {
    const currentUser = req.session.currentUser;
    const currentUserId = currentUser._id;

    const user = await User.findById(currentUserId).populate("activitiesGoing");
    const registerActivity = user.activitiesGoing;
    res.render("profile/going", { registerActivity });
  } catch (error) {
    next(error);
  }
});

router.get("/search-results", (req, res, next) => {
  res.render("profile/search-results");
});

router.post("/search-results", async (req, res, next) => {
  try {
    const findActivity = await Activity.find({
      name: { $regex: req.body.text, $options: "i" },
    });
    res.render("profile/search-results", { findActivity });
  } catch (error) {
    next(error);
  }
});

//Working with AXIOS
router.get("/json-list", isLoggedIn, async (req, res, next) => {
  try {
    const currentUser = req.session.currentUser;
    const currentUserId = currentUser._id;

    const user = await User.findById(currentUserId).populate("bookmarkList");
    const savedActivities = user.bookmarkList;
    res.json(savedActivities);
  } catch (error) {
    next(error);
  }
});
//Working with AXIOS - unregister
router.get("/json-list-unregister", isLoggedIn, async (req, res, next) => {
  try {
    const currentUser = req.session.currentUser;
    const currentUserId = currentUser._id;

    const user = await User.findById(currentUserId).populate("activitiesGoing");
    const activitiesGoing = user.activitiesGoing;
    res.json(activitiesGoing);
  } catch (error) {
    next(error);
  }
});

//Load profile
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const activities = await Activity.find().populate("savedByUsers");
    res.render("profile/profile", { activities });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
