const { Schema, model } = require("mongoose");

const activitySchema = new Schema(
    {
    name:{
        type:String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    imageUrl:{type: String },
    date: {type: Date},
    location:{type: String},
    price: {type: Number},
    organizer: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    comments:[]//TODO update with Comment ObjectID later
    },
    {
        timestamps: true,
    }

);
const Activity = model("Activity", activitySchema);
module.exports = Activity;