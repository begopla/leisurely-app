const router = require("express").Router();

const Activity = require("../models/Activity.model");


router.get("/", async (req, res, next)=>{
	try {
		const activities = await Activity.find()
		res.render("profile",{ activities});
	} catch (error) {
	  next(error);
}
});



module.exports = router;

