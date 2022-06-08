const router = require("express").Router();
const Comment = require("../models/Comment.model");
const Activity = require("../models/Activity.model");
const { isLoggedIn } = require("../middlewares/auth.middlewares");

router.get("/:id/comments", async (req, res, next) => {
  const { id } = req.params;
  try {
    const activityDetails = await Activity.findById(id).populate("user");
    res.render("activities/comments", { activityDetails });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/comments", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const { comments } = req.body;
  try {
    const newComment = await Comment.create({
      user: req.session.currentUser._id,
      comment: comments,
    });
    await Activity.findByIdAndUpdate(
      id,
      {
        $addToSet: { comments: newComment._id },
      },
      { new: true }
    );
    res.redirect(`/a/${id}`);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/comments/delete", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    await Activity.findByIdAndDelete(id);
    res.redirect(`/a/${id}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
