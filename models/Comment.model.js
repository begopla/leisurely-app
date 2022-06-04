const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    maxlength: 250,
  },
});

module.exports = model("Comment", commentSchema);
