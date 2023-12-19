import { Schema, models, model } from "mongoose";

const VideoCallSchema = new Schema({
  sender: {
    type: Schema.ObjectId,
    ref: "User",
  },
  recipient: {
    type: Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const VideoCall = models.VideoCall || model("VideoCall", VideoCallSchema);

export default VideoCall;
