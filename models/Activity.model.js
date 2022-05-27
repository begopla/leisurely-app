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
    startDate: {type: Date},
    endDate: {type: Date},
    location:{type: String},
    price: {type: Number},
    organizer: {
        type: String
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments:[] 
    },
    {
        timestamps: true,
    }

);
const Activity = model("Activity", activitySchema);
module.exports = Activity;