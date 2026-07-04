import mongoose, { Schema } from "mongoose";

const Session = 
mongoose.models.Session || 
mongoose.model("Session",{
    userId:{
        type: Schema.Types.ObjectId,
        required: true,
    },
    createAt:{
    type: Date,
    default: Date.now,
    expires: 3600 * 24 * 7,
    }
});

export default Session;