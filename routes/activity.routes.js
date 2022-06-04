const router = require("express").Router();

const { isLoggedIn } = require("../middlewares/auth.middlewares");
const { isLoggedOut } = require("../middlewares/auth.middlewares");
const Activity = require("../models/Activity.model");
const User = require("../models/User.model");

//Load activity details
//This router is prefixed with /a

//Create an activity (get/post)

router.get("/create", isLoggedIn, (req, res, next) => {
  try {
    res.render("activities/new-activity");
  } catch (error) {
    next(error);
  }
});

router.post("/create", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.session.currentUser;
    const currentUser = user._id;
    const {
      name,
      description,
      imageUrl,
      startDate,
      endDate,
      location,
      price,
      organizer,
    } = req.body;
    const newActivity = await Activity.create({
      name,
      description,
      imageUrl,
      startDate,
      endDate,
      location,
      price,
      organizer,
      user,
    });
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
});

//Edit activitites

router.get("/:id/edit", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const activityDetails = await Activity.findById(id);
    const activityOwner = await activityDetails.populate("user");

    const activityUser = activityOwner.user;
    const activityuserId = activityUser;
    const activityUserIdValue = activityuserId._id.valueOf();
    const currentUser = req.session.currentUser._id;
    if (currentUser === activityUserIdValue) {
      const theUser = true;
      res.render("activities/edit-activity", { activityDetails, theUser });
    } else {
      res.render("activities/activities-details", {
        activityDetails,
        errorMessage: "You do not have edit rights",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/:id/edit", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      imageUrl,
      startDate,
      endDate,
      location,
      price,
      organizer,
    } = req.body;
    await Activity.findByIdAndUpdate(
      id,
      {
        name,
        description,
        imageUrl,
        startDate,
        endDate,
        location,
        price,
        organizer,
      },
      { new: true }
    );
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

//Delete activity
router.post("/:id/delete", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    await Activity.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

//Bookmark activity

router.post("/:id/save", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const savedActivity = await Activity.findById(id);

    const currentUser = req.session.currentUser;
    const currentUserId = currentUser._id;

    await User.findByIdAndUpdate(
      currentUserId,
      { $addToSet: { bookmarkList: savedActivity._id } },
      { new: true }
    );
    await Activity.findByIdAndUpdate(
      id,
      { $addToSet: { savedByUsers: currentUserId } },
      { new: true }
    );
    res.redirect("/profile/savedactivities");
  } catch (error) {
    next(error);
  }
});

//Remove bookmark on activity (with AXIOS)
router.post("/:id/unsave", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const savedActivity = await Activity.findById(id);

    const currentUser = req.session.currentUser;
    const currentUserId = currentUser._id;

    await User.findByIdAndUpdate(
      currentUserId,
      { $pull: { bookmarkList: savedActivity._id } },
      { new: true }
    );

    await Activity.findByIdAndUpdate(
      id,
      { $pull: { savedByUsers: currentUserId } },
      { new: true }
    );

    // await Activity.findByIdAndUpdate(id,{$addToSet:{savedByUsers: id}}, {new: true});
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
});
//See activity details
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const activityDetails = await Activity.findById(id)
      .populate("user")
      .populate("savedByUsers")
      .populate({
        path: "comments",
        populate: ["user"],
      });
    /* const comments = activityDetails.comments;
    console.log(activityDetails.comments); */
    const theUser = req.session.currentUser;
    let notsavedactivity = true;
    if (theUser) {
      const activityUser = activityDetails.user;
      const activityUserId = activityUser._id.valueOf();
      const currentUserId = theUser._id;
      const savedusers = activityDetails.savedByUsers;
      let savedactivities = false;
      savedusers.forEach((element) => {
        if (currentUserId === element._id.valueOf()) {
          savedactivities = true;
          notsavedactivity = false;
          console.log("eureka!");
        }
      });

      if (activityUserId === currentUserId) {
        res.render("activities/activities-details", {
          activityDetails,
          theUser,
          savedactivities,
          notsavedactivity,
        });
      } else {
        res.render("activities/activities-details", {
          activityDetails,
          notsavedactivity,
          savedactivities,
        });
      }
    } else {
      res.render("activities/activities-details", {
        activityDetails,
        notsavedactivity,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
