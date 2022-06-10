const { Schema, model, SchemaTypes } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: String,
    birthday: {
      type: SchemaTypes.Mixed,
    },
    nationality: String,
    profilePicture: String,
    job: String,
    location: String,
    bookmarkList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Activity",
      },
    ],
    activitiesGoing: [
      {
        type: Schema.Types.ObjectId,
        ref: "Activity",
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
