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

router.get("/:id/edit",isLoggedIn, async (req, res, next)=>{
  try {
    const {id} = req.params;
    const activityDetails = await Activity.findById(id);
   // console.log(activityDetails)
    const activityOwner = await activityDetails.populate('user');

    const activityUser = activityOwner.user;
    const activityuserId = activityUser;
    const activityUserIdValue =activityuserId._id.valueOf() ;
    //?how can we make activityUserIdValue and local const to use it as middleware (exposeuser ) ?
    //req.app.locals.activityUser = activityuserId._id.valueOf();
    const currentUser= req.session.currentUser._id;
    if(currentUser === activityUserIdValue){

      res.render("activities/edit-activity",  { activityDetails });
    }
  
    else{
      res.render("activities/activities-details", {activityDetails, errorMessage:'You do not have edit rights'});
    } 
  
   }catch (error) {
    next(error);
  }

});

router.post("/:id/edit",isLoggedIn, async (req,res,next)=>{
  try {
    const { id } =req.params;
    const {name, description, imageUrl, startDate, endDate, location, price, organizer} = req.body;
    await Activity.findByIdAndUpdate(id, {name, description, imageUrl, startDate, endDate, location, price, organizer},{new:true});
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});


//See activity details
//Delete activity
//TODO: delete route 404 error
router.get("/:id/delete",isLoggedIn, async (req,res,next)=>{
try {
 const {id } =req.params;
  await Activity.findByIdAndDelete(id);
  res.redirect('/');
} catch (error) {
  next(error);
}
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const activityDetails = await Activity.findById(id);
    //TODO create comment model and display when loading activity details
    res.render("activities/activities-details",{activityDetails});
  } catch (error) {
    next(error);
  }
});


module.exports = router;
