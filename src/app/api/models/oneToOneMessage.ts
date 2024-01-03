import { Schema, models, model } from "mongoose";

const OneToOneMsgSchema = new Schema({
  name: {
    type: String,
    required: [true, "Order Name is required"],
  },
  image: {
    type: String,
  },
  participants: [
    {
      type: Schema.ObjectId,
      ref: "User",
    },
  ],
  order: {
    type: Schema.ObjectId,
    ref: "Order",
  },
  messages: {
    type: [
      {
        to: {
          type: Schema.ObjectId,
          ref: "User",
        },
        from: {
          type: Schema.ObjectId,
          ref: "User",
        },
        type: {
          type: String,
          enum: ["Text", "Media", "Document", "Link"],
        },
        created_at: {
          type: Date,
          default: Date.now,
        },
        text: {
          type: String,
        },
        file: {
          type: String,
        },
      },
    ],
    default: [],
  },
  unreadMsg: {
    unread: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.ObjectId || null,
      ref: "User",
    },
  },
});

const OneToOneMessage =
  models.OneToOneMessage || model("OneToOneMessage", OneToOneMsgSchema);

export default OneToOneMessage;
