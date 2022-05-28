const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.middlewares.js");
const updloader = require("../config/cloudinary");
const User = require("../models/User.model");

// get root settings
router.get("/", async (req, res, next) => {
  try {
    const myUser = req.session.currentUser;
    console.log(req.session.currentUser);
    //const userSettings = await User.find();
    res.render("settings/user-settings", { userSettings: [myUser] });
  } catch (error) {
    next(error);
  }
});

router.get("/user-settings-edit", async (req, res, next) => {
  try {
    const editSettings = req.session.currentUser;
    res.render("settings/user-settings-edit", { editSettings });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/user-settings-edit",
  updloader.single("profilePicture"),
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
    } = req.body;
    try {
      await User.findByIdAndUpdate(
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
        },
        { new: true }
      );
      res.redirect(`/settings/user-settings`);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
