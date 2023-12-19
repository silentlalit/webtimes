import { Schema, models, model } from "mongoose";

const FriendRequestSchema = new Schema({
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

const FriendRequest =
  models.FriendRequest || model("FriendRequest", FriendRequestSchema);

export default FriendRequest;
