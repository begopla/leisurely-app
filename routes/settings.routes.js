const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.middlewares.js");
const updloader = require("../config/cloudinary");
const User = require("../models/User.model");

// get root settings
router.get("/user-settings", isLoggedIn, async (req, res, next) => {
  try {
    const myUser = req.session.currentUser;
    //const userSettings = await User.find();
    res.render("settings/user-settings", { userSettings: [myUser] });
  } catch (error) {
    next(error);
  }
});

router.get("/user-settings-edit", isLoggedIn, async (req, res, next) => {
  try {
    const editSettings = req.session.currentUser;
    console.log(editSettings);
    res.render("settings/user-settings-edit", { editSettings });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/user-settings-edit",
  updloader.single("profilePicture"),
  isLoggedIn,
  async (req, res, next) => {
    const id = req.session.currentUser._id;
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      birthday,
      nationality,
      profilePicture,
      job,
      location
    } = req.body;
    /* if (req.file) {
      req.body.profilePicture = req.file.path;
    } */
    try {
      const newUser = await User.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          email,
          password,
          gender,
          birthday,
          nationality,
          profilePicture: req.file.path,
          job, 
          location
        },
        { new: true }
      );
      res.locals.currentUser = newUser;
      res.render("settings/user-settings");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
