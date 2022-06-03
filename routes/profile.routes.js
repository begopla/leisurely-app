const router = require("express").Router();
const async = require("hbs/lib/async");
const { isLoggedIn } = require("../middlewares/auth.middlewares.js");
const Activity = require("../models/Activity.model");
const User = require("../models/User.model");
//This router is prefixed with /profile

//Load saved activities(get)

router.get("/savedactivities", isLoggedIn, async (req,res,next) =>{
  try {
    const currentUser = req.session.currentUser;
    const currentUserId = currentUser._id;


    const user = await User.findById(currentUserId).populate('bookmarkList');
    const savedActivities = user.bookmarkList;
    console.log(savedActivities)
    res.render("profile/saved-activities", { savedActivities })
  } catch (error) {
    next(error)
  }
});





//Working with AXIOS
router.get("/json-list", isLoggedIn, async (req,res,next) =>{
  try {
    const currentUser = req.session.currentUser;
    const currentUserId = currentUser._id;


    const user = await User.findById(currentUserId).populate('bookmarkList');
    const savedActivities = user.bookmarkList;
    res.json(savedActivities);
  } catch (error) {
    next(error)
  }
});

//Load profile
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const activities = await Activity.find();
    res.render("profile/profile", { activities });
  } catch (error) {
    next(error);
  }
});



module.exports = router;
