const router = require("express").Router();

const async = require("hbs/lib/async");
const Activity = require("../models/Activity.model");


//Load activity details

router.get("/", async (req,res,next) =>{
    try {
        const activities = await Activity.find();
        //TODO create and activities view when logged in.
        // res.render("activities",{activities});
    } catch (error) {
        next(error);
    }
} )


module.exports = router;