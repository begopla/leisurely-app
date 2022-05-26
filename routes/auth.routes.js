const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const { isLoggedOut } = require("../middlewares/auth.middlewares.js");

// register
router.get("/register",isLoggedOut ,(req, res, next) => {
  res.render("auth/register");
});

router.post("/register", isLoggedOut, async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  // check if email and password are entered
  if (!email || !password) {
    return res.render("auth/register", {
      errorMessage: `Please enter Email or Password`,
    });
  }
  // check email format
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(email)) {
    return res.render("auth/register", {
      errorMessage: `Your Email is not valid`,
    });
  }

  // check password strength
  const passwordRegex =
    /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/;
  if (!passwordRegex.test(password)) {
    return res.render("auth/register", {
      errorMessage: `Password must be at least 8 characters long, includes one or more uppercase and lowercase letters, has at least one digit,
      has one special character`,
    });
  }
  try {
    // check if email is already registered
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.render("auth/register", {
        errorMessage: `Your're already registered with this Account`,
      });
    }

    // encrypt password
    const hashedPassword = bcrypt.hashSync(password);
    // create user
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    res.redirect("/auth/login");
  } catch (error) {
    next(error);
  }
});

//login
router.get("/login",isLoggedOut, (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  // check if email or pw exists
  if (!email || !password) {
    return res.render("auth/login", {
      errMessage: `You entered the wrong Email or Password`,
    });
  }

  // check if entered password matches from database
  const passwordRegex =
    /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/;

  if (!passwordRegex.test(password)) {
    return res.render("auth/login", {
      errMessage: `Password must be at least 8 characters long, includes one or more uppercase and lowercase letters, has at least one digit,
      has one special character`,
    });
  }

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.render("auth/login", { errMessage: `Wrong Email` });
    }

    const passwordCheck = bcrypt.compareSync(password, checkUser.password);
    if (!passwordCheck) {
      return res.render("auth/login", {
        errMessage: `Oops, you entered the wrong Password`,
      });
    } else {
      // if user exists, change to object
      const checkUserToObject = checkUser.toObject();
      console.log(checkUserToObject);
      // delete password
      delete checkUserToObject.password;
      // save user in session
      req.session.currentUser = checkUserToObject;
      console.log(req.session.currentUser);
      // authenticate user
      // req.app.locals.currentUser = true;
      return res.redirect("/profile");
    }
  } catch (error) {
    next(error);
  }
});


router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.redirect("/auth/login");
});

module.exports = router;
