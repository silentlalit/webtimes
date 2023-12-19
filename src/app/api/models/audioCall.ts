import { Schema, models, model } from "mongoose";

const audioCallSchema = new Schema({
  participants: [
    {
      type: Schema.ObjectId,
      ref: "User",
    },
  ],
  from: {
    type: Schema.ObjectId,
    ref: "User",
  },
  to: {
    type: Schema.ObjectId,
    ref: "User",
  },
  verdict: {
    type: String,
    enum: ["Accepted", "Denied", "Missed", "Busy"],
  },
  status: {
    type: String,
    enum: ["Ongoing", "Ended"],
  },
  startedAt: {
    type: Date,
    default: Date.now(),
  },
  endedAt: {
    type: Date,
  },
});

const AudioCall = models.AudioCall || model("AudioCall", audioCallSchema);

export default AudioCall;
